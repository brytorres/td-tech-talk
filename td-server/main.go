package main

import (
	"os"
	"td-talk-websocket/handler"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	router := gin.Default()
	router.GET("/", handler.WebsocketHandler)

	godotenv.Load("../.env")
	port := os.Getenv("PORT")
	if port == "" {
		port = "4242"
	}

	router.Run(":" + port)
}
