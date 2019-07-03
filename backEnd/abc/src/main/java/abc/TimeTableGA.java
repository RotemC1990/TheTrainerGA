package abc;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.common.collect.Lists;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;



public class TimeTableGA {

	static int interval;
	static Timer timer;
	private static boolean timerStoped;





	public static void main(String args) {
		//split the data from the client to the arrays
		String [] splitArray;
		String firstCharForSptit = "%";
		String secondCharForSptit = "#";
		String thiredCharForSptit = "@";
		splitArray = args.split(firstCharForSptit);
		String TrainerUid = splitArray[1];
		String []TraineesArray= splitArray[0].split(secondCharForSptit);
		String [][] TArray = new String [TraineesArray.length][];
		for(int i=0; i< TraineesArray.length; i++) {
			TArray[i]=TraineesArray[i].split(thiredCharForSptit);
		}


		// TODO Auto-generated method stub
		final int POPULATION_SIZE =20;
		final double MUTATION_RATE = 0.6;
		final double CROSSOVER_RATE = 0.9;

		//Initialize the time table
		timerStoped=false;
		startTimer();
		Timetable timeTable = initTimeTalbe(TArray);

		// merge the time slots with there trainees
		timeTable.mergeById(timeTable);


		//Initialize the Generic Algorithm
		GeneticAlgorithm ga = new GeneticAlgorithm(POPULATION_SIZE, MUTATION_RATE, CROSSOVER_RATE);

		//set the population
		Population population = ga.initPopulation(timeTable);
		//check the fitness of the chromosomes of the population
		ga.evalPopulation(population, timeTable);

		// Keep track of current generation
		int generation = 1;



		while ( ga.isTerminationConditionMet(population) == false || isTimerStoped()) {

			// Apply crossover
			population = ga.crossoverPopulation(population,timeTable);

			// Apply mutation
			if(ga.getMutationRate()>Math.random())
				population = ga.mutatePopulation(population, timeTable);

			// Evaluate population
			ga.evalPopulation(population, timeTable);



			// Increment the current generation
			generation++;
			//System.out.println("generation : "+generation);
		}
		int bestFit =getBestFitneesLocation(population);
		System.out.println("best fit location is : " + bestFit);


		timerStoped =true;
		System.out.println();
		System.out.println("#####################################################################");
		System.out.println("########################--------END--------##########################");
		System.out.println("#####################################################################");
		System.out.println();
		System.out.println();
		Individual [] pop =population.getPopulation();

		int [] BestChromosome =pop[bestFit].getChromosome();
		ga.calcFitness(pop[bestFit],timeTable,true);
		ga.standardDeviationFitness(pop[bestFit],timeTable,true);
		System.out.println();
		System.out.println();


		String []scheduleToFB = new String [98];
		for(int i=0;i<98;i++)
		{
			if(BestChromosome[i]!=-1 && BestChromosome[i]!=-2)
			{
				scheduleToFB[i]=timeTable.getMerge().get(BestChromosome[i]).getTrainee().getTraineeName();
			}
			else 
				scheduleToFB[i]="";
		}
		

		// Use the application default credentials

		try {
			//initialize the firebase
			// Use a service account
			InputStream serviceAccount = new FileInputStream("C:/Users/Astre/eclipse-workspace/abc/the-trainer-332c2-4fabd75b7653.json");
			GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
			FirebaseOptions options = new FirebaseOptions.Builder()
			    .setCredentials(credentials)
			    .build();
			FirebaseApp.initializeApp(options);

			Firestore db = FirestoreClient.getFirestore();
			// Update an existing document
			DocumentReference docRef = db.collection("users").document(TrainerUid);
			List scheduleInList = new ArrayList<String>(Arrays.asList(scheduleToFB));
			// (async) Update one field
			ApiFuture<WriteResult> future = docRef.update("finalSchedule", scheduleInList);
			

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}


	}



	private static Timetable initTimeTalbe(String [][] TArray)
	{
		//create time table
		Timetable timeTable = new Timetable();

	


		//put the array from app to int array
		int [][] schedule = new int [TArray.length][98];
		for(int i=0; i< TArray.length ; i++) {
			for (int j=0; j<98;j++) {
				schedule[i][j] =Integer.parseInt(TArray[i][j]);
			}
		}

		//check how many timeSlots we need
		int numOfTimeSlots[] = new int [TArray.length];
		Arrays.fill(numOfTimeSlots, 0);
		boolean continueFlag = false;
		for(int i=0;i<schedule.length;i++) {
			for(int j=0;j<98;j++) {
				if(schedule[i][j]==0) {
					if(!continueFlag)
					{
						numOfTimeSlots[i]=numOfTimeSlots[i]+1;
						continueFlag = true;
					}
					while((schedule[i][j] ==0 && ((1+j)%14) !=0 && continueFlag)  )
						j++;
					continueFlag=false;

				}
			}
		}

		//Initialize time slots
		continueFlag = false;
		int timeSlotsNum=1;
		for(int i=0;i<numOfTimeSlots.length; i++) {

			int start=0;
			int end =0;
			for(int j=0; j<98; j++) {
				if(schedule[i][j]==0) {
					if(!continueFlag)
					{
						start= j%14 +8;
						continueFlag = true;
					}
					while((schedule[i][j] ==0 && ((1+j)%14) !=0 && continueFlag)  )
						j++;
					if(continueFlag) {
						end =  j%14 +8;
						int id=i+1;
						timeTable.addTimeSlot(timeSlotsNum, getDayString(j),start,end, end-start,id);
						timeSlotsNum++;
					}	
					continueFlag=false;
				}	
			}	
		}
		// add the trainees to the time table
		for(int i=0; i<TArray.length;i++) {
			int id =i+1;
			timeTable.addTrainee(id, TArray[i][100],Integer.parseInt(TArray[i][98]));
		}

		return timeTable;

	}

	//timer for 30 min
	private static void startTimer() {
		int delay = 1000;
		int period = 1000;
		final int SECONDS = 60;
		final int MINUTES = 30;
		timer = new Timer();
		interval = SECONDS*MINUTES;
		timer.scheduleAtFixedRate(new TimerTask() {

			public void run() {
				setInterval();

			}
		}, delay, period);
	}
	//a timer to end the algorithm after 30 min
	private static final int setInterval() {
		if (interval == 1 || timerStoped)
		{
			int AlgoTime = 1801;
			AlgoTime=AlgoTime-interval;
			System.out.println("time of algorithem : " + AlgoTime +" seconds");
			timerStoped = true;
			timer.cancel();
		}
		return --interval;
	}
	
	//return true or false to know if 30 min has pass
	public static boolean isTimerStoped() {
		return timerStoped;
	}
	//function that return the chromosome with the best fitnees
	private static int getBestFitneesLocation(Population population)
	{

		double []fitnessArray=population.getPopulationFitness(); 
		double bestFit=fitnessArray[0];
		int bestFitPlace=0;
		int i;
		for(i=0;i<population.getPopulation().length;i++)
		{
			if(fitnessArray[i]==1.0)
				return i;
			if(fitnessArray[i]>bestFit)
			{
				bestFit=fitnessArray[i];
				bestFitPlace=i;
			}
		}
		return i;
	}
	//function that get the day in a number  and return the day in a string
	private static String getDayString(int number)
	{
		String day ="";
		if(number<14)
			day="Sunday";
		else if (number<28)
			day="Monday";
		else if (number<42)
			day="Tuesday";
		else if (number<56)
			day="Wednesday";
		else if (number<70)
			day="Thursday";
		else if (number<84)
			day="Saturday";
		else 
			day="Monday";

		return day;
	}
}



