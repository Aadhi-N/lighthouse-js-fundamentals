class Player 
	attr_reader :name, :life

	def initialize(name)
		@name = name
		@life = 3
	end

	def take_damage
		@life -= 1
	end

	def dead?
		@life <= 0
	end

end



