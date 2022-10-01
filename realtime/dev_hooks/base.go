package dev_hooks

import (
	"bytes"
	"html/template"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/mails/templates"
	"github.com/pocketbase/pocketbase/tokens"
	"github.com/pocketbase/pocketbase/tools/hook"
)

func SaveMail(app *pocketbase.PocketBase) {
	app.OnMailerBeforeAdminResetPasswordSend().Add(func(e *core.MailerAdminEvent) error {
		saveAdminResetPasswordMail(app, e)
		return hook.StopPropagation
	})

	app.OnMailerBeforeUserChangeEmailSend().Add(func(e *core.MailerUserEvent) error {
		saveUserChangeEmailMail(app, e)
		return hook.StopPropagation
	})

	app.OnMailerBeforeUserResetPasswordSend().Add(func(e *core.MailerUserEvent) error {
		saveUserResetPasswordMail(app, e)
		return hook.StopPropagation
	})

	app.OnMailerBeforeUserVerificationSend().Add(func(e *core.MailerUserEvent) error {
		saveUserVerificationMail(app, e)
		return hook.StopPropagation
	})
}

func saveAdminResetPasswordMail(app *pocketbase.PocketBase, e *core.MailerAdminEvent) error {
	user := e.Admin
	settings := app.Settings()
	token, tokenErr := tokens.NewAdminResetPasswordToken(app, user)
	if tokenErr != nil {
		return tokenErr
	}

	_, body, err := resolveEmailTemplate(app, token, settings.Meta.ResetPasswordTemplate)
	if err != nil {
		return err
	}

	saveHtmlMail(body, "adminPasswordReset")

	return nil
}

func saveUserChangeEmailMail(app *pocketbase.PocketBase, e *core.MailerUserEvent) error {
	user := e.User
	newEmail := e.Meta["newEmail"].(string)
	settings := app.Settings()
	token, tokenErr := tokens.NewUserChangeEmailToken(app, user, newEmail)
	if tokenErr != nil {
		return tokenErr
	}

	_, body, err := resolveEmailTemplate(app, token, settings.Meta.ConfirmEmailChangeTemplate)
	if err != nil {
		return err
	}

	saveHtmlMail(body, "userChangeEmail")

	return nil
}

func saveUserResetPasswordMail(app *pocketbase.PocketBase, e *core.MailerUserEvent) error {
	user := e.User
	settings := app.Settings()
	token, tokenErr := tokens.NewUserResetPasswordToken(app, user)
	if tokenErr != nil {
		return tokenErr
	}

	_, body, err := resolveEmailTemplate(app, token, settings.Meta.ResetPasswordTemplate)
	if err != nil {
		return err
	}

	saveHtmlMail(body, "userVerification")

	return nil
}

func saveUserVerificationMail(app *pocketbase.PocketBase, e *core.MailerUserEvent) error {
	user := e.User
	settings := app.Settings()
	token, tokenErr := tokens.NewUserVerifyToken(app, user)
	if tokenErr != nil {
		return tokenErr
	}

	_, body, err := resolveEmailTemplate(app, token, settings.Meta.VerificationTemplate)
	if err != nil {
		return err
	}

	saveHtmlMail(body, "userVerification")

	return nil
}

/**
 *	THE FOLLOWING CODE IS TAKEN FROM THE POCKETBASE REPO
 *	https://github.com/pocketbase/pocketbase
 * 	ALL CREDIT TO POCKETBASE AND THE APPROPRIATE AUTHORS
 */

// https://github.com/pocketbase/pocketbase/blob/master/mails/user.go#L142-L167
// Borrowing this from the pocketbase codebase to recreate the base emails
func resolveEmailTemplate(
	app core.App,
	token string,
	emailTemplate core.EmailTemplate,
) (subject string, body string, err error) {
	settings := app.Settings()

	subject, rawBody, _ := emailTemplate.Resolve(
		settings.Meta.AppName,
		settings.Meta.AppUrl,
		token,
	)

	params := struct {
		HtmlContent template.HTML
	}{
		HtmlContent: template.HTML(rawBody),
	}

	body, err = resolveTemplateContent(params, templates.Layout, templates.HtmlBody)
	if err != nil {
		return "", "", err
	}

	return subject, body, nil
}

// https://github.com/pocketbase/pocketbase/blob/master/mails/base.go#L11-L33
// Borrowing this from the pocketbase codebase to recreate the base emails
func resolveTemplateContent(data any, content ...string) (string, error) {
	if len(content) == 0 {
		return "", nil
	}

	t := template.New("inline_template")

	var parseErr error
	for _, v := range content {
		t, parseErr = t.Parse(v)
		if parseErr != nil {
			return "", parseErr
		}
	}

	var wr bytes.Buffer

	if executeErr := t.Execute(&wr, data); executeErr != nil {
		return "", executeErr
	}

	return wr.String(), nil
}
