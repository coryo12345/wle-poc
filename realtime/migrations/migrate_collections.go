package migrations

import (
	"encoding/json"
	"log"
	"os"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

// Auto generated migration with the most recent collections configuration.
func Init_collections() {
	m.Register(func(db dbx.Builder) error {
		jsonData, err := os.ReadFile("seed-data/pb_schema.json")
		if err != nil {
			log.Fatal(err)
		}

		collections := []*models.Collection{}
		if err := json.Unmarshal(jsonData, &collections); err != nil {
			return err
		}
		return daos.New(db).ImportCollections(collections, true, nil)
	}, func(db dbx.Builder) error {
		// no revert since the configuration on the environment, on which
		// the migration was executed, could have changed via the UI/API
		return nil
	})
}
