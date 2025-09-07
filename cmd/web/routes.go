package main

import "net/http"

func (app *application) routes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /{$}", app.home)
	mux.HandleFunc("POST /snippets", app.handlePostSnippets)
	mux.HandleFunc("GET /snippets/{id}", app.handleGetSnippetByID)

	return mux
}
