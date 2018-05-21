require './player.rb'
require './turn-manager.rb'

class Game
	attr_reader :player1, :player2

	def initialize 
		@player1 = Player.new('Bob')
		@player2 = Player.new('Jane')

		@players = [player1, player2]
		@turn = TurnManager.new(@players)
	end

	def game_over?
		@players.count == 1
	end

	def run
		while !game_over?
			current_player = @turn.current_player
			puts "it's now #{current_player.name}'s turn"
		end
	end

end


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


class Question
	number1 = rand(1..20)
	number2 = rand(1..20)
	puts "What is #{number1} plus #{number2}?"
end



# MAIN PAGE TO START GAME

game = Game.new()
game.run

# puts "Welcome to Millie's Math House - Lighthouse Edition"
# puts game.player1.name
# puts "Thanks for playing!"



