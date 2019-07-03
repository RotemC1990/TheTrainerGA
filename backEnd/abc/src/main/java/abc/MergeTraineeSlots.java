package abc;


public class MergeTraineeSlots {

	private final Trainee trainee;
	private final Timeslot timeslot;
	private final int key;
	
	//constructor
	public MergeTraineeSlots(Trainee trainee,Timeslot timeslot, int key)
	{
		this.trainee=trainee;
		this.timeslot=timeslot;
		this.key=key;
	}
	//getters
	public int getKey() {
		return key;
	}

	public Trainee getTrainee() {
		return trainee;
	}

	public Timeslot getTimeslot() {
		return timeslot;
	}
}
