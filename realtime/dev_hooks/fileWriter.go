package dev_hooks

import (
	"fmt"
	"os"
	"time"
)

const (
	output_dir = "dev_data/"
)

func saveHtmlMail(body string, action string) error {
	now := time.Now()
	filename := output_dir + action + "_" + now.Format("01_02_2006_15_04_05") + ".html"

	fmt.Println("Attempting to write email to: " + filename)
	os.Mkdir(output_dir, os.ModePerm)
	err := os.WriteFile(filename, []byte(body), 0666) // read & write perms (not execute)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}
