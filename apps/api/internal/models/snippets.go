// Package models implements utility methods for basic CRUD operations.
package models

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Snippet struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	ExpiresAt time.Time `json:"expires_at"`
}

type SnippetModel struct {
	DB *pgxpool.Pool
}

func (m *SnippetModel) Insert(title, content string, expiresAt int) (int, error) {
	query := `
		INSERT INTO snippets (title, content, expires_at)
		VALUES ($1, $2, CURRENT_TIMESTAMP + INTERVAL '1 day' * $3)
		RETURNING id;`

	var lastID int

	err := m.DB.QueryRow(context.Background(), query, title, content, expiresAt).Scan(&lastID)
	if err != nil {
		return 0, err
	}

	return lastID, nil
}

func (m *SnippetModel) Get(id int) (Snippet, error) {
	query := `
		SELECT id, title, content, created_at, expires_at FROM snippets
		WHERE expires_at > CURRENT_TIMESTAMP AND id = $1;`

	var s Snippet

	err := m.DB.QueryRow(context.Background(), query, id).Scan(&s.ID, &s.Title, &s.Content, &s.CreatedAt, &s.ExpiresAt)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return Snippet{}, ErrNoRecord
		} else {
			return Snippet{}, err
		}
	}

	return s, nil
}

// Latest returns the 10 most recently created snippets.
func (m *SnippetModel) Latest() ([]Snippet, error) {
	query := `
		SELECT id, title, created_at, expires_at FROM snippets
		WHERE expires_at > CURRENT_TIMESTAMP
		ORDER BY id DESC LIMIT 10;`

	rows, err := m.DB.Query(context.Background(), query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var snippets []Snippet

	for rows.Next() {
		var s Snippet

		err = rows.Scan(&s.ID, &s.Title, &s.CreatedAt, &s.ExpiresAt)
		if err != nil {
			return nil, err
		}

		snippets = append(snippets, s)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return snippets, nil
}
