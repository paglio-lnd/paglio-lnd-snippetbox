package main

import (
	"context"
	"flag"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
	"snippetbox.paglio.dev/internal/models"
)

type application struct {
	logger   *slog.Logger
	snippets *models.SnippetModel
}

func main() {
	addr := flag.String("addr", ":4000", "HTTP network address")
	flag.Parse()

	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	connStr, err := getPostgresConnectionString("./secrets")
	if err != nil {
		logger.Error("failed trying to create db connection string", "err", err)
		os.Exit(1)
	}

	dbPool, err := createDBPool(connStr)
	if err != nil {
		logger.Error(err.Error())
		os.Exit(1)
	}
	defer dbPool.Close()

	logger.Info("connection pool established")

	app := &application{
		logger: logger,
		snippets: &models.SnippetModel{
			DB: dbPool,
		},
	}

	logger.Info("starting server", "address", *addr)

	err = http.ListenAndServe(*addr, app.routes())
	logger.Error(err.Error())
	os.Exit(1)
}

func getPostgresConnectionString(secretsDir string) (string, error) {
	dbUser, err := os.ReadFile(filepath.Join(secretsDir, "app_user.txt"))
	if err != nil {
		return "", fmt.Errorf("failed to read db_user: %w", err)
	}

	dbUserPassword, err := os.ReadFile(filepath.Join(secretsDir, "app_password.txt"))
	if err != nil {
		return "", fmt.Errorf("failed to read db_password: %w", err)
	}

	dbName, err := os.ReadFile(filepath.Join(secretsDir, "app_db_name.txt"))
	if err != nil {
		return "", fmt.Errorf("failed to read db_name: %w", err)
	}

	connStr := fmt.Sprintf(
		"postgres://%s:%s@localhost:5432/%s?sslmode=disable",
		strings.TrimSpace(string(dbUser)),
		strings.TrimSpace(string(dbUserPassword)),
		strings.TrimSpace(string(dbName)),
	)

	return connStr, nil
}

func createDBPool(connStr string) (*pgxpool.Pool, error) {
	dbPool, err := pgxpool.New(context.Background(), connStr)
	if err != nil {
		return nil, err
	}

	var greeting string
	err = dbPool.QueryRow(context.Background(), "SELECT 'Hello, Sir.'").Scan(&greeting)
	if err != nil {
		dbPool.Close()
		return nil, err
	}

	return dbPool, nil
}
