package abc;


public class Timeslot {
	//Fields
	private final int timeslotId;
	private final int startTime;
	private final int endTime;
	private final int numOfHours;
	private final String day;
	private final int traineeId;
	//constructor
	public Timeslot(int id,String day,int start,int end,int numOfHours,int traineeId)
	{
		this.timeslotId=id;
		this.day=day;
		this.startTime=start;
		this.endTime=end;
		this.numOfHours=numOfHours;
		this.traineeId =traineeId;
	}
	//getters and setters
	public int getTraineeId() {
		return traineeId;
	}

	public String getDay() {
		return day;
	}

	public int getEndTime() {
		return endTime;
	}

	public int getTimeslotId() {
		return timeslotId;
	}

	public int getStartTime() {
		return startTime;
	}

	public int getNumOfHours() {
		return numOfHours;
	}

}
