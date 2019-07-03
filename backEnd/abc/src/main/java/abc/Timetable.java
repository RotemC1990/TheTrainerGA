package abc;

import java.util.HashMap;
import java.util.concurrent.ThreadLocalRandom;


public class Timetable {
	//Fields
	private final  HashMap<Integer, Trainee> trainees;
	private final HashMap<Integer, Timeslot> timeslots;
	private final HashMap<Integer, MergeTraineeSlots> merge;
	private final int TABLE_SIZE=98; //7 DAYS 14 HOURS 
	private int  timesLotNum=0;
	private int numOfTrainee=0;
	private int numOfMerge=0;
	
	//constructor
	public Timetable()
	{
		this.trainees = new HashMap<Integer, Trainee>();
		this.timeslots = new HashMap<Integer, Timeslot>();
		this.merge = new HashMap<Integer, MergeTraineeSlots>();
	}
	
	//constructor
	public Timetable(Timetable cloneable)
	{
		
		this.trainees = cloneable.getTrainees();
		this.timeslots = cloneable.getTimeslots();
		this.merge = cloneable.getMerge();

	}
	
	//add time slot
	public void addTimeSlot(int id,String day, int startHour,int endHour,int numOfHours,int traineeId)
	{
		this.timeslots.put(id,new Timeslot(id, day, startHour,endHour, numOfHours,traineeId));
		timesLotNum++;
	}
	
	//getters
	public HashMap<Integer, Trainee> getTrainees() {
		return trainees;
	}
	
	public HashMap<Integer, Timeslot> getTimeslots() {
		return timeslots;
	}
	
	public HashMap<Integer, MergeTraineeSlots> getMerge() {
		return merge;
	}
	
	public int getTABLE_SIZE() {
		return TABLE_SIZE;
	}
	
	public int getTimesLotNum() {
		return this.timesLotNum;
	}
	
	public int getNumOfTrainee() {
		return this.numOfTrainee;
	}
	
	public MergeTraineeSlots[] getMergeToArray()
	{
		return (MergeTraineeSlots[]) this.merge.values().toArray(new MergeTraineeSlots[this.merge.size()]);
	}
	
	public Timeslot getRandomTimeslot() {
		Object[] timeslotArray = this.timeslots.values().toArray();
		Timeslot timeslot = (Timeslot) timeslotArray[(int) (timeslotArray.length * Math.random())];
		return timeslot;
	}
	
	public Timeslot[] getTimeslotAsArray() {
		return (Timeslot[]) this.timeslots.values().toArray(new Timeslot[this.timeslots.size()]);
	}


	// add new trainee
	public void addTrainee(int id , String name, int numOfTrainings) {
		this.trainees.put(id,new Trainee(id, name,numOfTrainings));
		numOfTrainee++;
		
	}


	//function that merge the time slots and the trainees by the trainee id
	public void mergeById(Timetable timetable)
	{
		int numOfTrainee=getNumOfTrainee();
		int numOfSlots=getTimesLotNum();
		int count=1;
		for(int i=1;i<=numOfTrainee;i++)
		{
			for(int j=1;j<=numOfSlots;j++)
			{
				if(timetable.trainees.get(i).getTraineeId()==timetable.timeslots.get(j).getTraineeId())
				{
					this.merge.put(count, new MergeTraineeSlots(timetable.trainees.get(i), timetable.timeslots.get(j), count));
					count++;
					numOfMerge++;
				}
			}
		}
	}
	
	
	//if its -1 we cannot use this place, otherwise we can (-2 is a blank space that we didnt use)
	public void fillInRandomSpace(int[] newChromosome) {
		for ( int key : merge.keySet() ) {
			int randomNum ;
			boolean ok=false;
			while(!ok)
			{
				randomNum = ThreadLocalRandom.current().nextInt(0, TABLE_SIZE- 1);
				if(randomNum<TABLE_SIZE)
					if(newChromosome[randomNum]!=-1)
					{
						newChromosome[randomNum]=key;
						ok=true;
					}
			}
		}
	}
}
