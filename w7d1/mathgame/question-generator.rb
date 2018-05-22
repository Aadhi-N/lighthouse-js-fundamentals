class NewQuestion
	def number1
		@number1 = rand(1..20)
	end

	def number2
		@number2 = rand(1..20)
	end

	def answer
		@number1 + @number2
	end
end
