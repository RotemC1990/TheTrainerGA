package abc;

public class Population {

	private Individual population[];
	private double[] populationFitness;
	
	
	//Initializes blank population of individuals
	public Population(int populationSize) {
		// Initial population
		this.population = new Individual[populationSize];
	}
	//getters and setters
	public double[] getPopulationFitness() {
		return populationFitness;
	}

	public void setPopulationFitness(double[] populationFitness) {
		this.populationFitness = populationFitness;
	}

	public Individual[] getPopulation() {
		return this.population;
	}
	//constructor
	public Population(int populationSize, Timetable timetable) {
		// Initial population
		this.population = new Individual[populationSize];
		// Loop for creating the population 
		for (int individualCount = 0; individualCount < populationSize; individualCount++) {
			// Create individual
			Individual individual = new Individual(timetable);
			// Add individual to population
			this.population[individualCount] = individual;
		}
		
	}



	//put an recived individual (chromosome) in the population
	public void replaceIndividual(int position, Individual newIndividual) {
		population[position]=newIndividual;
		
	}
	
}
