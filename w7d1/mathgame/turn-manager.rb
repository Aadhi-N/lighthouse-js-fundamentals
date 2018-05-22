class TurnManager
	def initialize(players)
		@players = players.dup.shuffle
	end

	def current_player
		@players.first
	end

	def next_turn
		@players.rotate!
	end
end