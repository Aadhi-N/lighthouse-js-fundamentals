require './player.rb'
require './turn-manager.rb'
require './question-generator.rb'

class Game
	attr_reader :player1, :player2

	def initialize 
		@player1 = Player.new('Bob')
		@player2 = Player.new('Jane')

		@players = [player1, player2]
		@turn = TurnManager.new(@players)
		@question = NewQuestion.new()
	end

	def game_over?
		@players.count == 1
	end

	def run
		while !game_over?
			current_player = @turn.current_player
			puts "it's now #{current_player.name}'s turn"
			puts "What is #{@question.number1} plus #{@question.number2}?"
			life = current_player.take_damage
			ans = gets.chomp.to_i

			if (ans === @question.answer)
				puts "Wow, much smart!"
			elsif (current_player.dead?)
				puts "GAME OVER! "
			else
				puts "Nope...you lost a life! Lives left: #{life}"
			end
			puts "Summary score: #{player1.name}: #{player1.life} --- #{player2.name}: #{player2.life}"
			@turn.next_turn
		end
				
	end
	
end



