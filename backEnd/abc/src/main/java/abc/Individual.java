package abc;


import java.util.Arrays;

public class Individual {
	private int[] chromosome;
	public int[] getChromosome() {
		return chromosome;
	}
	//Contractor - make a new chromosome
	public Individual()
	{
		int newChromosome[] = new int[98];
	}

	public Individual(Timetable timetable) {
		// Create random individual chromosome
		int newChromosome[] = new int[timetable.getTABLE_SIZE()];

		//fill the chromosome array with -1
		Arrays.fill(newChromosome, -1);
		//init the chromosome unblanked spaces with zeros
		initChromosome(timetable,newChromosome);

		//fill in the zeros place the id of the merge randomly
		timetable.fillInRandomSpace(newChromosome);
		this.chromosome=newChromosome;


	

	}
	//initialize the chromosome
	private void initChromosome(Timetable timetable, int[] newChromosome) {
		for(MergeTraineeSlots merge:timetable.getMergeToArray())
		{
			String day =merge.getTimeslot().getDay();
			int startTimeLot =merge.getTimeslot().getStartTime();
			int endTimeLot=merge.getTimeslot().getEndTime();
			System.out.println("day " + day);
			System.out.println("startTimeLot " + startTimeLot);
			System.out.println("endTimeLot " + endTimeLot);
			int start=0;
			int end;
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
				start=84;
			
			start+=startTimeLot-8;
			end=start+endTimeLot-startTimeLot;
			
			System.out.println("start : " +start);
			System.out.println("end : " +end);
			
			for(int i=start;i<end;i++)
				newChromosome[i]=-2;//had 0

		}

	}
	//setter for chromosome
	public void setChromosome(int[] chromosome) {
		this.chromosome = chromosome;
	}

}
