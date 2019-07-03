package abc;

import java.util.Arrays;
import java.util.HashMap;
import java.util.concurrent.ThreadLocalRandom;

public class GeneticAlgorithm {
	private int populationSize;
	private double mutationRate;


	private double crossoverRate;

	//Constructor
	public GeneticAlgorithm(int populationSize, double mutationRate, double crossoverRate) 
	{
		this.populationSize=populationSize;
		this.mutationRate=mutationRate;
		this.crossoverRate=crossoverRate;

	}

	//Initialize the population
	public Population initPopulation(Timetable timetable) {
		Population population = new Population(this.populationSize,timetable);
		return population;

	}
	//get the population fitness
	public void evalPopulation(Population population, Timetable timetable) 
	{
		double populationFitness[] = new double [population.getPopulation().length];
		// Loop over population evaluating individuals and summing population
		// fitness
		int i=0;
		for (Individual individual : population.getPopulation()) 
		{
			populationFitness[i] = this.calcFitness(individual, timetable,false);
			i++;

		}

		population.setPopulationFitness(populationFitness);

	}
	
	//calculate the all fitness
	public double calcFitness(Individual individual, Timetable timetable,boolean print) {
		// Create new timetable object to use -- cloned from an existing timetable
		int sumOfHours=getMaxHours(timetable);
		int hoursInUse = getHoursInUse(individual);

		double hoursFit = ((double)hoursInUse/(double)sumOfHours)*0.2;
		if(hoursFit>0.25)
			hoursFit=0.2;

		int inPlace = inTheRightPlace(individual,timetable);

		double placeFit = ((double)inPlace/(double)hoursInUse)*0.3;

		double generalFitness =generalTimeTableCheck(individual, timetable);
		generalFitness = generalFitness*0.15;
		double DaysFitness =daysTimeTableCheck( individual, timetable);
		DaysFitness = DaysFitness *0.15;


		double standardDeviation =standardDeviationFitness(individual, timetable,false);
		standardDeviation=standardDeviation*0.1;

		double simulateHumanScoreFitness = simulateHumanScoreFitness(individual, timetable);

		simulateHumanScoreFitness =simulateHumanScoreFitness*0.1;
		double fitness = hoursFit+placeFit+generalFitness+DaysFitness+standardDeviation+simulateHumanScoreFitness;

		if(print == true) {
			System.out.println("hoursFit " + hoursFit/0.2+ " placeFit : " +placeFit/0.3 +" generalFitness : " + generalFitness/0.15);
			System.out.println("DaysFitness : "+DaysFitness/0.15+"  HumanScoreFitness : "+ simulateHumanScoreFitness/0.1);
		}
		return fitness;
	}

	//calculate the general timetable fitness
	private double generalTimeTableCheck(Individual individual, Timetable timetable)
	{
		int numOfChromosome = timetable.getNumOfTrainee();
		HashMap<Integer, MergeTraineeSlots> mergeTrainees = timetable.getMerge();
		int [] traineesOptionCounter = new int [timetable.getNumOfTrainee()+1];
		Arrays.fill(traineesOptionCounter, 0);
		//calculate the general num of option that the trainee gives
		for(int chromosomeID=1;chromosomeID<=numOfChromosome;chromosomeID++)
		{	
			for(int i=1;i<=mergeTrainees.size();i++)
			{
				if(chromosomeID == mergeTrainees.get(i).getKey())
				{
					int startTime =timetable.getMerge().get(i).getTimeslot().getStartTime();
					int endTime=timetable.getMerge().get(i).getTimeslot().getEndTime();
					int totalTime = endTime-startTime;
					traineesOptionCounter[chromosomeID] += totalTime;
				}
			}
		}

		int [] wantedTrainings = getNumOfTrainingsArray(timetable);
		int [] sumArray = new int [timetable.getNumOfTrainee()+1];
		int [] TrainingsReceiveArrray = getCountTraineesReceiveArray(individual, timetable);
		for(int i=1; i< sumArray.length;i++) 
		{
			if(wantedTrainings[i]-TrainingsReceiveArrray[i] != 0)
			{
				int unReceiveTrainees = wantedTrainings[i]-TrainingsReceiveArrray[i];
				int tempWantedTrainees = traineesOptionCounter[i]-TrainingsReceiveArrray[i];
				sumArray[i]=98-(unReceiveTrainees*tempWantedTrainees);
			}
			else
				sumArray[i]=98;
		}


		double sum=0;

		for(int i=1; i< sumArray.length;i++) 
			sum+=sumArray[i];
		sum = sum/ timetable.getNumOfTrainee();
		sum = sum/98;

		return sum;
	}

	// function that return the fitness by days
	private double daysTimeTableCheck(Individual individual, Timetable timetable)
	{
		int [] recivedTrainnesArray = getCountTraineesReceiveArray(individual, timetable);
		int numOfTrainees = timetable.getNumOfTrainee();
		double [] scoreOfTraineesSunday = new double [numOfTrainees+1];
		double [] scoreOfTraineesMonday = new double [numOfTrainees+1];
		double [] scoreOfTraineesTuesday = new double [numOfTrainees+1];
		double [] scoreOfTraineesWednesday = new double [numOfTrainees+1];
		double [] scoreOfTraineesThursday = new double [numOfTrainees+1];
		double [] scoreOfTraineesFriday = new double [numOfTrainees+1];
		double [] scoreOfTraineesSaturday = new double [numOfTrainees+1];
		double [] sumOfScores =  new double [numOfTrainees+1];
		Arrays.fill(sumOfScores,0);
		Arrays.fill(scoreOfTraineesSunday, 0);
		Arrays.fill(scoreOfTraineesMonday, 0);
		Arrays.fill(scoreOfTraineesTuesday, 0);
		Arrays.fill(scoreOfTraineesWednesday, 0);
		Arrays.fill(scoreOfTraineesThursday, 0);
		Arrays.fill(scoreOfTraineesFriday, 0);
		Arrays.fill(scoreOfTraineesSaturday, 0);
		for(int traineeId=1;traineeId<=numOfTrainees;traineeId++)
		{
			//check if the trainee didn't get all of the wanted trainees
			if(timetable.getTrainees().get(traineeId).getNumOfTrainings() != recivedTrainnesArray[traineeId])
			{

				for(MergeTraineeSlots merge  :  timetable.getMergeToArray())
				{
					//int key =timetable.getMerge().keySet();
					if(merge.getKey() == traineeId)
					{
						boolean isThere = false;
						String day=timetable.getMerge().get(traineeId).getTimeslot().getDay();
						int dayStartInNum = getStartDayInNumber(day);
						int dayEndInNum = dayStartInNum+14;
						int start=getStartTime( timetable , traineeId);
						int end =getEndTime(timetable ,traineeId);
						int[] chromosomeArray = individual.getChromosome();
						//check if the trainee get the training in the specific day
						int place;
						for( place=dayStartInNum ; place < dayEndInNum;  place++) 
						{
							if(chromosomeArray[place] == merge.getKey())
							{
								isThere= true;
								break;
							}
						}
						for( place=place+1 ; place < dayEndInNum;  place++) 
						{
							if(chromosomeArray[place] == merge.getKey())
								chromosomeArray[place]=-2;
						}
						//if not it count the required options
						if(!isThere)
						{
							if(day == "Sunday") {
								scoreOfTraineesSunday[traineeId]+=end-start;
							}
							else if(day == "Monday") {
								scoreOfTraineesMonday[traineeId]+=end-start;
							}
							else if(day == "Tuesday") {
								scoreOfTraineesTuesday[traineeId]+=end-start;
							}
							else if(day == "Wednesday") {
								scoreOfTraineesWednesday[traineeId]+=end-start;
							}
							else if(day == "Thursday") {
								scoreOfTraineesThursday[traineeId]+=end-start;
							}
							else if(day == "Friday") {
								scoreOfTraineesFriday[traineeId]+=end-start;
							}
							else
								scoreOfTraineesSaturday[traineeId]+=end-start;

						}

					}
				}
			}
		}
		int [] countDays = new int [numOfTrainees+1];
		Arrays.fill(countDays, 0);

		for(int i=1; i<=numOfTrainees;i++)
		{

			if(scoreOfTraineesSunday [i]!=0)
			{
				countDays[i]+=1;
				scoreOfTraineesSunday [i] = 1-(scoreOfTraineesSunday [i] / 14);
			}

			if(scoreOfTraineesMonday [i]!=0)
			{
				countDays[i]+=1;
				scoreOfTraineesMonday [i] = 1-(scoreOfTraineesMonday [i] / 14);
			}

			if(scoreOfTraineesTuesday [i]!=0)
			{
				countDays[i]+=1;
				scoreOfTraineesTuesday [i] = 1-(scoreOfTraineesTuesday [i] / 14);
			}

			if(scoreOfTraineesWednesday [i]!=0)
			{
				countDays[i]+=1;
				scoreOfTraineesWednesday [i] = 1-(scoreOfTraineesWednesday [i] / 14);
			}

			if(scoreOfTraineesThursday [i]!=0)
			{
				countDays[i]+=1;
				scoreOfTraineesThursday [i] = 1-(scoreOfTraineesThursday [i] / 14);
			}

			if(scoreOfTraineesFriday [i]!=0)
			{
				countDays[i]+=1;
				scoreOfTraineesFriday [i] = 1-(scoreOfTraineesFriday [i] / 14);
			}

			if(scoreOfTraineesSaturday [i]!=0)
			{
				countDays[i]+=1;
				scoreOfTraineesSaturday[i] = 1-(scoreOfTraineesSaturday [i] / 14);
			}


		}
		for(int i=1;i<=numOfTrainees;i++)
		{
			int unRecieveTrainees = timetable.getTrainees().get(i).getNumOfTrainings()-recivedTrainnesArray[i];
			if(unRecieveTrainees>0)
			{
				sumOfScores[i]=(scoreOfTraineesSunday [i] + scoreOfTraineesMonday [i]+
						scoreOfTraineesTuesday [i] +scoreOfTraineesWednesday [i]+ 
						scoreOfTraineesThursday [i] + scoreOfTraineesFriday [i] +
						scoreOfTraineesSaturday[i]);
			}
		}
		double finalDaysScore=0;
		for(int i=1; i<=numOfTrainees;i++)
		{
			if(sumOfScores[i]!=0 ||countDays[i] !=0)
				sumOfScores[i]/=countDays[i];
			finalDaysScore+=sumOfScores[i];
		}
		if(finalDaysScore ==0)
			finalDaysScore=1;
		else
			finalDaysScore/=7;


		return finalDaysScore;
	}
	//return the start time in integer value
	private int getStartTime(Timetable timetable , int traineeId)
	{
		String day=timetable.getMerge().get(traineeId).getTimeslot().getDay();
		int startTimeLot =timetable.getMerge().get(traineeId).getTimeslot().getStartTime();
		int start=getStartDayInNumber(day);
		start+=startTimeLot-8;
		return start;
	}
	//return the end time in integer value
	private int getEndTime(Timetable timetable , int traineeId)
	{
		String day=timetable.getMerge().get(traineeId).getTimeslot().getDay();
		int startTimeLot =timetable.getMerge().get(traineeId).getTimeslot().getStartTime();
		int endTimeLot=timetable.getMerge().get(traineeId).getTimeslot().getEndTime();
		int start=getStartDayInNumber(day);
		int end ;
		start+=startTimeLot-8;
		end=start+endTimeLot-startTimeLot;
		return end;
	}
	//return an array with the number of training for every trainee
	private int [] getCountTraineesReceiveArray(Individual individual, Timetable timetable) {
		int [] traineesReceiveArrray = new int [timetable.getNumOfTrainee()+1];
		Arrays.fill(traineesReceiveArrray, 0);
		int placeinArray =0;
		for(int chromosome:individual.getChromosome())
		{
			if(chromosome!=-1 && chromosome!=-2)
			{
				if(specificTraineeInRightPlace(individual,timetable,chromosome,placeinArray))
					traineesReceiveArrray[timetable.getMerge().get(chromosome).getTrainee().getTraineeId()]+=1;
			}
			placeinArray++;
		}
		return traineesReceiveArrray;
	}
	//check if a specific trainee is in the right place
	private boolean specificTraineeInRightPlace(Individual individual,Timetable timetable,int chromosome,int placeInArray)
	{

		int start=getStartTime( timetable , chromosome);
		int end =getEndTime(timetable ,chromosome) ;
		if(placeInArray>=start && placeInArray<end)
			return true;
		return false;
	}
	//return how many of the inserted training is in the right place
	private int inTheRightPlace(Individual individual, Timetable timetable) {
		int rightPlace=0;
		int placeInArray=0;
		for(int chromosome:individual.getChromosome())
		{

			if(chromosome!=-1 && chromosome!=-2)
			{
				int start=getStartTime( timetable , chromosome);
				int end =getEndTime(timetable ,chromosome) ;
				if(placeInArray>=start && placeInArray<end)
					rightPlace++;
			}
			placeInArray++;
		}
		return rightPlace;
	}
	
	//return an array with the trainees wanted training
	private int [] getNumOfTrainingsArray(Timetable timetable) 
	{
		int [] numOfTrainingsArray = new int[timetable.getNumOfTrainee()+1];
		Arrays.fill(numOfTrainingsArray,0);
		for(int i=1; i<numOfTrainingsArray.length;i++)
			numOfTrainingsArray[i]=timetable.getTrainees().get(i).getNumOfTrainings();

		return numOfTrainingsArray;
	}
	//return the number of hours that in use in the chromosome
	private int getHoursInUse(Individual individual) {
		int hoursInUseSum=0;
		for(int chromosome:individual.getChromosome())
			if(chromosome!=-1 && chromosome!=-2)
				hoursInUseSum+=1;
		return hoursInUseSum;
	}
	//return the max of hours that we need to put in the schedule
	private int getMaxHours(Timetable timetable) {
		int hoursSum =0;
		int [] trainingArray= getNumOfTrainingsArray(timetable);
		for(int id =1;id<trainingArray.length;id++)
			hoursSum+=trainingArray[id];
		return hoursSum;
	}
	//check if there is some chromosome with fitness of 1
	//if there is we can end the algorithm
	public boolean isTerminationConditionMet(Population population) {
		double []fitnessArray=population.getPopulationFitness(); 
		for(int i=0;i<population.getPopulation().length;i++)
		{
			if(fitnessArray[i]==1.0)
				return true;
		}
		return false;
	}

	//make crossover with 2 chromosomes
	public Population crossoverPopulation(Population population,Timetable timetable) {
		if(this.crossoverRate>Math.random())
		{
			double []fitness = population.getPopulationFitness();
			double [] sortedFitness= new double[population.getPopulationFitness().length];
			Arrays.sort(sortedFitness);
			double maxFit1=0;
			double maxFit2=0;
			double minFit=sortedFitness[0];

			if(sortedFitness.length>0)
			{
				int firtsPick =randomPopulationPick(-1);
				int secondPick = randomPopulationPick(firtsPick);
				maxFit1=sortedFitness[firtsPick];
				if(sortedFitness.length>1)
					maxFit2=sortedFitness[secondPick];
			}
			int positionMax1=0;
			int positionMax2=0;
			int positionMin=0;
			for(int i=0;i<fitness.length;i++)
			{
				if(fitness[i]==maxFit1)
					positionMax1=i;
				if(fitness[i]==maxFit2)
					positionMax2=i;
				if(fitness[i]==minFit)
					positionMin=i;
			}

			Individual[] indArr = population.getPopulation();
			Individual newIndividual = new Individual();
			int [] chromosome1 = indArr[positionMax1].getChromosome();
			int [] chromosome2 = indArr[positionMax2].getChromosome();
			int [] newChromosome = new int[chromosome1.length];

			int [] randomDays = new int [6];
			Arrays.fill(randomDays, -1);
			randomDays4Cross(randomDays);



			for(int i=0;i<newChromosome.length;i++)
			{
				if(i>=randomDays[0] && i<randomDays[1])
					newChromosome[i]=chromosome2[i];
				else if(i>=randomDays[2] && i<randomDays[3])
					newChromosome[i]=chromosome2[i];
				else if(i>=randomDays[4] && i<randomDays[5])
					newChromosome[i]=chromosome2[i];
				else
					newChromosome[i]=chromosome1[i];
			}

			newIndividual.setChromosome(newChromosome);
			population.replaceIndividual(positionMin,newIndividual);
		}
		return population;
	}
	//pick random places in the chromosome to make crossover
	private void randomDays4Cross(int [] randomDays)
	{
		randomDays[0]= ThreadLocalRandom.current().nextInt(0, 97);
		randomDays[1]= ThreadLocalRandom.current().nextInt(0, 97);
		while(randomDays[0] == randomDays[1])
			randomDays[1]= ThreadLocalRandom.current().nextInt(0, 97);
		randomDays[2]= ThreadLocalRandom.current().nextInt(0, 97);
		while(randomDays[0] == randomDays[2] || randomDays[1] == randomDays[2])
			randomDays[2]= ThreadLocalRandom.current().nextInt(0, 97);
		randomDays[3]= ThreadLocalRandom.current().nextInt(0, 97);
		while(randomDays[0] == randomDays[3] || randomDays[1] == randomDays[3] || randomDays[2] == randomDays[3])
			randomDays[3]= ThreadLocalRandom.current().nextInt(0, 97);
		randomDays[4]= ThreadLocalRandom.current().nextInt(0, 97);
		while(randomDays[0] == randomDays[4] || randomDays[1] == randomDays[4] || randomDays[2] == randomDays[4] || randomDays[3] == randomDays[4])
			randomDays[4]= ThreadLocalRandom.current().nextInt(0, 97);
		randomDays[5]= ThreadLocalRandom.current().nextInt(0, 97);
		while(randomDays[0] == randomDays[5] || randomDays[1] == randomDays[5] || randomDays[2] == randomDays[5] || randomDays[3] == randomDays[5] || randomDays[4] == randomDays[5])
			randomDays[5]= ThreadLocalRandom.current().nextInt(0, 97);

		Arrays.sort(randomDays);

	}
	//pick a 2 random chromosomes from the population
	private int randomPopulationPick(int firstPick) {
		if(firstPick == -1) {
			int randNum = ThreadLocalRandom.current().nextInt(0, 100);
			return getRandomSelection(randNum);
		}
		//second random pick
		else {
			int randNum2 = ThreadLocalRandom.current().nextInt(0, 100);
			int checkNumber =getRandomSelection(randNum2);
			while(firstPick == checkNumber)
			{
				randNum2 = ThreadLocalRandom.current().nextInt(0, 100);
				checkNumber =getRandomSelection(randNum2);
			}
			return checkNumber;
		}
	}
	//helping the randomPopulationPick with picking a random chromosome
	private int getRandomSelection(int selection)
	{
		int returnNum;
		if(selection>80)
			returnNum =19;
		else if (selection> 65 && selection<=80)
			returnNum =18;
		else if (selection> 53 && selection<=65)
			returnNum =17;
		else if (selection> 44 && selection<=53)
			returnNum =16;
		else if (selection> 36 && selection<=44)
			returnNum =15;
		else if (selection> 29 && selection<=36)
			returnNum =14;
		else if (selection> 23 && selection<=29)
			returnNum =13;
		else if (selection> 18 && selection<=23)
			returnNum =12;
		else if (selection> 14 && selection<=18)
			returnNum =12;
		else if (selection> 11 && selection<=14)
			returnNum =10;
		else if (selection> 9 && selection<=11)
			returnNum =9;
		else if (selection> 7 && selection<=9)
			returnNum =8;
		else
			returnNum =selection;
		return returnNum;
	}


	//make a mutate to a random chromosome 
	public Population mutatePopulation(Population population, Timetable timeTable) {
		int pickRandomIndividual =getRandomIndividual(population);
		Individual selectedIndividual= population.getPopulation()[pickRandomIndividual];
		mutateIndividual(selectedIndividual,timeTable);
		return population;
	}
	//help function to mutatePopulation with  picking up a random chromosome
	private void mutateIndividual(Individual individual, Timetable timeTable) {
		//pickup a random chromosome
		int randChromosomePlace=randomChromosomePlace(individual.getChromosome());
		//this value will randomly choose if we want to put a trainee in his place 
		//or remove a trainee from a place he doesn't belong there
		double putOrRemove = Math.random();
		final double REMOVE =0.5;
		//put
		if(putOrRemove>REMOVE)
		{
			boolean traineeFound =false;
			for(MergeTraineeSlots merge :  timeTable.getMergeToArray())
			{
				int start=getStartTime(timeTable, merge.getKey());
				int end = getEndTime(timeTable, merge.getKey());

				if(randChromosomePlace>=start && randChromosomePlace<end)
				{
					int traineeId = merge.getKey();
					int[] chromosome = individual.getChromosome();
					for(int i=start ; i < end; i++)
					{
						if(chromosome[i]==traineeId)
						{
							traineeFound=true;
						}
						else if(chromosome[i]!=-1 && chromosome[i]!=-2)
						{
							int startCheck = getStartTime(timeTable, chromosome[i]);
							int endCheck = getEndTime(timeTable, chromosome[i]);
							if(i<startCheck || i>=endCheck)
								chromosome[i]=-2;
						}
					}
					if(!traineeFound) {
						chromosome[randChromosomePlace]=traineeId;
						individual.setChromosome(chromosome);

					}
				}

			}
		}
		//remove
		else
		{
			int chromosomeSize = timeTable.getTABLE_SIZE();
			int randomPlace = ThreadLocalRandom.current().nextInt(0, chromosomeSize-1);
			int[] chromosome = individual.getChromosome();
			HashMap<Integer, MergeTraineeSlots> merge =  timeTable.getMerge();
			for(int place =randomPlace; place<chromosomeSize;place++)
			{
				int randomId = chromosome[place];
				if(randomId != -1 && randomId != -2)
				{
					Timeslot randomTimeSlot =merge.get(randomId).getTimeslot();
					int start = getStartTime(timeTable, randomId);
					int end = getEndTime(timeTable, randomId);
					if(place<start || place >=end )
					{
						int sumOfHours=getMaxHours(timeTable);
						int hoursInUse = getHoursInUse(individual);
						chromosome[place]=-2;
						individual.setChromosome(chromosome);
						sumOfHours=getMaxHours(timeTable);
						hoursInUse = getHoursInUse(individual);
						break;
					}

				}
			}
		}
	}

	//return the standard deviation fitness for a specific chromosome
	public double standardDeviationFitness(Individual individual, Timetable timeTable, boolean print)
	{
		double avg=getAverageUnreceiveTrainings(individual,timeTable);

		int [] unreceivedTrainingArray = new int [timeTable.getNumOfTrainee()+1];
		Arrays.fill(unreceivedTrainingArray, 0);
		unreceivedTrainingArray =GetUnreceivedTrainingArray(individual, timeTable);

		double standardDeviation=0;

		for(int i=1 ; i<unreceivedTrainingArray.length;i++)
		{
			standardDeviation+=Math.pow(unreceivedTrainingArray[i]-avg,2);
		}
		standardDeviation/=timeTable.getNumOfTrainee();

		standardDeviation=Math.pow(standardDeviation, 0.5);
		if(print == true)
			System.out.println("standardDeviation  "+ standardDeviation);
		standardDeviation = 1-standardDeviation;
		if(standardDeviation<-5)
			standardDeviation=0.1;
		else if(standardDeviation<-4)
			standardDeviation=0.2;
		else if(standardDeviation<-3)
			standardDeviation=0.3;
		else if(standardDeviation<-2)
			standardDeviation=0.5;
		else if(standardDeviation<-1)
			standardDeviation=0.7;
		else if(standardDeviation<0)
			standardDeviation=0.9;
		return standardDeviation;
	}
	//return the simulate human score fitness for a specific chromosome
	private double simulateHumanScoreFitness(Individual individual, Timetable timeTable)
	{
		double avg=getAverageUnreceiveTrainings(individual,timeTable);
		int [] unreceivedTrainingArray = new int [timeTable.getNumOfTrainee()+1];
		Arrays.fill(unreceivedTrainingArray, 0);
		unreceivedTrainingArray =GetUnreceivedTrainingArray(individual, timeTable);

		double sum =0;
		for(int i=1 ; i<unreceivedTrainingArray.length;i++)
		{
			sum =sum+ (10-(Math.pow(unreceivedTrainingArray[i]-avg,2)));
		}
		sum=sum/10;
		sum=sum/timeTable.getNumOfTrainee();
		return sum;
	}
	//Return an array with trainees that didnt get all of there wanted training
	private int []GetUnreceivedTrainingArray(Individual individual, Timetable timeTable)
	{
		int [] wantedTrainings = getNumOfTrainingsArray(timeTable);
		int [] trainingsReceiveArrray = getCountTraineesReceiveArray(individual, timeTable);
		int [] unreceivedTrainingArray = new int [timeTable.getNumOfTrainee()+1];
		Arrays.fill(unreceivedTrainingArray, 0);
		for(int i=1 ; i<unreceivedTrainingArray.length;i++)
		{
			unreceivedTrainingArray[i]=wantedTrainings[i]-trainingsReceiveArrray[i];
		}
		return unreceivedTrainingArray;
	}
	//Return the average of num of trainees that didnt get all of there wanted training
	private double getAverageUnreceiveTrainings(Individual individual,Timetable timeTable)
	{
		int sumOfUereceiveTrainings = 0;
		for(MergeTraineeSlots merge :  timeTable.getMergeToArray())
		{
			sumOfUereceiveTrainings += merge.getTrainee().getNumOfTrainings();
		}
		int [] traineesReceiveArrray = getCountTraineesReceiveArray(individual, timeTable);
		for(int i=1;i<traineesReceiveArrray.length;i++)
		{
			sumOfUereceiveTrainings-=traineesReceiveArrray[i];
		}
		int numOfTrainees =timeTable.getNumOfTrainee();
		double avg=0;
		if(numOfTrainees!=0)
			avg=sumOfUereceiveTrainings/numOfTrainees;
		return avg;
	}
	//return a random chromosome place
	private int randomChromosomePlace(int[] chromosome) {
		int chromosomeSize = chromosome.length;
		int pickedChromosome=-1; //null at the chromosome array
		int chromosomePlace=0;
		while(pickedChromosome==-1)
		{
			chromosomePlace = ThreadLocalRandom.current().nextInt(0, chromosomeSize-1);
			pickedChromosome = chromosome[chromosomePlace];
		}
		return chromosomePlace;
	}
	
	//return a random individual
	private int getRandomIndividual(Population population) {

		int populationSize = population.getPopulation().length;
		int randomPopulation = ThreadLocalRandom.current().nextInt(0, populationSize-1);
		return randomPopulation;
	}
	//Return the start name in number of the inserted day
	private int getStartDayInNumber(String day)
	{
		int start=0;
		if(day == "Sunday") {
			start=0;
		}
		else if(day == "Monday") {
			start=14;
		}
		else if(day == "Tuesday") {
			start=28;
		}
		else if(day == "Wednesday") {
			start=42;
		}
		else if(day == "Thursday") {
			start=56;
		}
		else if(day == "Friday") {
			start=70;
		}
		else
			start =84;
		return start;
	}
	//return the mutate rate
	public double getMutationRate() {
		return mutationRate;
	}
}