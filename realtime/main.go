package main

import (
	"log"

	"wle/migrations"

	"github.com/pocketbase/pocketbase"
)

func main() {
	migrations.Init_collections()
	migrations.Init_data()

	app := pocketbase.New()

	// Uncomment the following line in localhost to save mail content as file instead of using mail server
	// dev_hooks.SaveMail(app)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
