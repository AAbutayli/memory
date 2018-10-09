defmodule MemoryWeb.GamesChannel do
    use GamesChannel, :channel
    alias MemoryWeb.Game 

    def join("games:" <> name, payload, socket) do
        if authorized?(payload)  do
            game = Game.new()
            socket = socket
            |> assign(:game, game)
            |> assign(:name, name)
            {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
        else
            {:error, %{reason: "unauthrized"}}
        end    
    end

    # TODO
    #def handle_in("guess", %{"letter" => ll}, socket) do
     #   game = Game.guess(socket.assigns[:game], ll)
      #  socket = assign(socket, :game, game)
       # {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
    #end
    
      # Add authorization logic here as required.
    defp authorized?(_payload) do
        true  
    end

end