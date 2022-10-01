FROM golang:1.19.1-alpine

RUN apk add build-base

WORKDIR /app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify
# RUN go mod tidy

COPY . .
RUN go build -v -o pocketbase.app

EXPOSE 8090

CMD ["/app/pocketbase.app", "serve", "--http", "0.0.0.0:8090"]
