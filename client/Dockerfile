FROM node:18-alpine AS builder

# Add a work directory
WORKDIR /app

ARG REACT_APP_BASE_URL
ARG REACT_APP_BLOG_URL

ENV REACT_APP_BASE_URL ${REACT_APP_BASE_URL}
ENV REACT_APP_BLOG_URL ${REACT_APP_BLOG_URL}

# Cache and Install dependencies

COPY package.json .
RUN npm install

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]