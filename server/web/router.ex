defmodule Server.Router do
  use Server.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Server do
    pipe_through :api
  end
end
