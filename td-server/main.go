package main

import (
	"td-talk-websocket/handler"

	"github.com/gin-gonic/gin"
)


func main() {
	router := gin.Default()
	router.GET("/", handler.WebsocketHandler)
	router.Run(":4242")
}
