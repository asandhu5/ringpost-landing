# The marketing website as a container, for AWS (ECS Fargate). Build from the repo root.
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Inlined into the browser bundle at build time, so they must be build arguments.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_DASHBOARD_URL
ARG NEXT_PUBLIC_RINGPOST_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_DASHBOARD_URL=$NEXT_PUBLIC_DASHBOARD_URL \
    NEXT_PUBLIC_RINGPOST_API_URL=$NEXT_PUBLIC_RINGPOST_API_URL \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
COPY --from=builder --chown=node:node /app/.next/standalone ./
# `next build` leaves public/ and the static assets out of the standalone folder.
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
# HOSTNAME is forced because the container runtime sets it to the container's own name, and the
# standalone server would bind to that instead of every interface. exec keeps node as PID 1 so it
# receives the stop signal.
CMD ["sh", "-c", "HOSTNAME=0.0.0.0 exec node server.js"]
