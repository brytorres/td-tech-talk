# TouchDesigner Tech Talk 

## Steps
Start server
```
go run main.go
```

Start UI
```
yarn dev
```

Start UI tunnel
```
ngrok http 3116
```

## Resources
UI - Local
`http://localhost:3116/index.html`

WebSockets - Local
`ws://localhost:4242/socket`

```json
// Sub to planets
{
  "action": "subscribe",
  "topic": "planets"
}
// Sub to watcher
{
  "action": "subscribe",
  "topic": "watcher"
}
```
