package abc;


public class Trainee {
	//fields
	private final int traineeId;
	private final String traineeName;
	private final int numOfTrainings;
	//constructor
	public Trainee(int id, String name, int numOfTrainings)
	{
		this.traineeId=id;
		this.traineeName=name;
		this.numOfTrainings=numOfTrainings;
	}
	//getters
	public int getNumOfTrainings() {
		return numOfTrainings;
	}

	public int getTraineeId() {
		return traineeId;
	}

	public String getTraineeName() {
		return traineeName;
	}
	
}
