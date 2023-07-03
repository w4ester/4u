// This file was auto-generated by Fern from our API Definition.

package api

import (
	context "context"
	core "github.com/fern-api/fern-go/internal/testdata/sdk/bearer/fixtures/core"
	http "net/http"
)

type UserClient interface {
	Get(ctx context.Context) (string, error)
}

func NewUserClient(opts ...core.ClientOption) UserClient {
	options := core.NewClientOptions()
	for _, opt := range opts {
		opt(options)
	}
	return &userClient{
		baseURL:    options.BaseURL,
		httpClient: options.HTTPClient,
		header:     options.ToHeader(),
	}
}

type userClient struct {
	baseURL    string
	httpClient core.HTTPClient
	header     http.Header
}

func (u *userClient) Get(ctx context.Context) (string, error) {
	endpointURL := u.baseURL

	var response string
	if err := core.DoRequest(
		ctx,
		u.httpClient,
		endpointURL,
		http.MethodGet,
		nil,
		&response,
		u.header,
		nil,
	); err != nil {
		return response, err
	}
	return response, nil
}
