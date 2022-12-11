package main

import (
	"td-talk-websocket/handler"

	"github.com/gin-gonic/gin"
)

// "td-talk-websocket/handler"

func main() {
	// log.Println("test")
	router := gin.Default()
	router.GET("/socket", handler.WebsocketHandler)
	router.Run(":4242")
}
