# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────
# Build stage: inject SEO metadata and write the static site to /app/out
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Optional Web3Forms access key for the contact form. Without it the form
# falls back to opening the visitor's email client.
ARG FORM_ACCESS_KEY=""
ENV FORM_ACCESS_KEY=$FORM_ACCESS_KEY

COPY package.json ./
COPY scripts ./scripts
COPY site ./site
RUN node scripts/build.mjs

# Fail loudly here rather than shipping an empty site.
RUN test -f out/index.html || (echo "Build produced no out/index.html" && exit 1)

# ─────────────────────────────────────────────────────────────
# Runtime stage: serve the static files with nginx
# ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
