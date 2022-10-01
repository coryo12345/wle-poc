package main

import (
	"fmt"
	"log"

	"wle/migrations"

	"github.com/pocketbase/pocketbase"
)

func main() {
	migrations.Init_collections()
	migrations.Init_data()

	app := pocketbase.New()
	app.Settings().Meta.AppName = "WLE"
	fmt.Println("appname: " + app.Settings().Meta.AppName)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
