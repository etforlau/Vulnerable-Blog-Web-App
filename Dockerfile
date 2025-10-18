# Use Docker image that allows Jenkins to manipulate container
FROM jenkins/agent:alpine-jdk21

# Switch to root to add necessary installations
USER root

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Switch back to expected jenkins user
USER jenkins

# Make port available for calls outside of Docker service infrastructure
EXPOSE 3000