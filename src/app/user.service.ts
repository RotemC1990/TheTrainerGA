import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import { AngularFirestore , AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


interface user{
    username: string,
    uid: string,
    type: string,
    displayName: string,
    trainerUID: string,
    trainerName: string,
    trainees: string[],
    traineeSchedule: string [],
    trainerBlockArray: boolean[],
    finalSchedule: string[],
    canInputSchedule: boolean,
    scheduleToAlgorithem: string[][],
    insertedWeekSchedule : boolean,
    winAndLose: number;
}




@Injectable()
export class UserService{
    public user: user;
    public dataCollections;
    private userDoc: AngularFirestoreDocument<user>;
    private userData = '';
    private traineeSchedule1: string[];
    private finalSchedule: string[];
    private insertTrainings: boolean =false;
    private blockArray: boolean[];
    private winAndLose: number;
    private scheduleUidToCalculate: string[];
    private numOftraineesToSchedule: number;
    private placeInArray: number;

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore)
    {
        this.dataCollections = afs.collection<any>(`users`);
    }
    async getTraineeSchedule(uid)
    {
        return new Promise<string[]>((resolve, reject) => {
            this.dataCollections.valueChanges().subscribe(collection => {
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].uid == uid) {
                        this.traineeSchedule1 = collection[i].traineeSchedule;
                    }
                }

                return resolve(this.traineeSchedule1);
            });
        });
    }



    async getScheduleUidToCalculate(trainerUid)
    {
        this.numOftraineesToSchedule = 0 ;
        return new Promise<string[]>((resolve, reject) => {
            this.dataCollections.valueChanges().subscribe(collection => {
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].trainerUID == trainerUid) {
                        if (collection[i].insertedWeekSchedule == true) {
                            this.numOftraineesToSchedule++;
                        }
                    }
                }
                this.scheduleUidToCalculate = new Array(this.numOftraineesToSchedule);
                this.placeInArray = 0;
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].trainerUID == trainerUid) {
                        if (collection[i].insertedWeekSchedule == true) {
                            this.scheduleUidToCalculate[this.placeInArray] = collection[i].uid;
                            this.placeInArray++;
                        }
                    }
                }

                return resolve(this.scheduleUidToCalculate);
            });
        });
    }
    async getScheduleNameThatNotInserted(trainerUid)
    {
        let countOfTrainees = 0 ;
        return new Promise<string[]>((resolve, reject) => {
            this.dataCollections.valueChanges().subscribe(collection => {
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].trainerUID == trainerUid) {
                        if (collection[i].insertedWeekSchedule == false) {
                            countOfTrainees++;
                        }
                    }
                }
                let TraineesName = new Array(countOfTrainees);
                this.placeInArray = 0;
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].trainerUID == trainerUid) {
                        if (collection[i].insertedWeekSchedule == false) {
                            TraineesName[this.placeInArray] = collection[i].displayName;
                            this.placeInArray++;
                        }
                    }
                }

                return resolve(TraineesName);
            });
        });
    }

    async getTraineeWinAndLose(uid) {
        return new Promise<number>((resolve, reject) => {
            this.dataCollections.valueChanges().subscribe(collection => {
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].uid == uid) {
                        this.winAndLose = collection[i].winAndLose;
                    }
                }

                return resolve(this.winAndLose);
            });
        });
    }



    setUser( user: user){
        this.user = user;
        this.getLoggedInUser();
    }
    //if we have problem so it is the user chaneges
    getUID(){
        if(!this.user){
            if(this.afAuth.auth.currentUser){
                const user = this.afAuth.auth.currentUser;
                this.setUser({
                    username: user.email,
                    uid: user.uid,
                    type: user.type,
                    displayName: user.displayName,
                    trainerUID: user.trainerUID,
                    trainerName: user.trainerName,
                    trainees: user.trainees,
                    trainerBlockArray : user.trainerBlockArray,
                    finalSchedule: user.finalSchedule,
                    canInputSchedule: user.canInputSchedule,
                    scheduleToAlgorithem: user.scheduleToAlgorithem,
                    traineeSchedule: user.traineeSchedule,
                    insertedWeekSchedule: user.insertedWeekSchedule,
                    winAndLose: user.winAndLose,

                })
                this.getLoggedInUser();
                return user.uid;
            } else {
                throw new Error("המשתמש אינו מחובר");
            }
        } else {
            return this.user.uid;
        }

    }
    getUserName() {
        return this.user.username;
    }

    getTrainerBlockArray() {
        return this.user.trainerBlockArray;
    }

    async getFinalSchedule(uid) {
        return new Promise<string[]>((resolve, reject) => {
            this.dataCollections.valueChanges().subscribe(collection => {
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].uid == uid) {
                        this.finalSchedule = collection[i].finalSchedule;
                    }
                }

                return resolve(this.finalSchedule);
            });
        });
    }

    getCanInputSchedule() {
        return this.insertTrainings;
    }

    getScheduleToAlgorithem() {
        return this.user.scheduleToAlgorithem;
    }

    getTrainerTrainees() {
        return this.user.trainees;
    }


    getUserType(){
        this.isAuthentaicted();
        return this.user.type;
    }

    getDisplayName(){
        return this.user.displayName;
    }

    getTrainerUID(){
        return this.user.trainerUID;
    }

    traineeGetTrainerBlockArray() {
        return this.blockArray;
    }

    async isAuthentaicted() {
        if (this.user) { return true; }

        const user = await this.afAuth.authState.pipe(first()).toPromise();

        if (user) {
            this.setUser({
                username: user.email,
                uid: user.uid,
                type: user.type,
                displayName: user.displayName,
                trainerUID: user.trainerUID,
                trainerName: user.trainerName,
                trainees: user.trainees,
                trainerBlockArray : user.trainerBlockArray,
                finalSchedule: user.finalSchedule,
                canInputSchedule: user.canInputSchedule,
                scheduleToAlgorithem: user.scheduleToAlgorithem,
                traineeSchedule : user.traineeSchedule,
                insertedWeekSchedule: user.insertedWeekSchedule,
                winAndLose: user.winAndLose,
            })
            this.getLoggedInUser();
            return true;
        }
        this.getLoggedInUser();
        return false;
    }

    async getLoggedInUser() {
        return new Promise((resolve, reject) => {
            this.dataCollections.valueChanges().subscribe(collection => {
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].uid == this.getUID()) {
                        this.user.username = collection[i].username;
                        this.user.uid = collection[i].uid;
                        this.user.type = collection[i].type;
                        this.user.displayName = collection[i].displayName;
                        this.user.trainerUID = collection[i].trainerUID;
                        this.user.trainerName = collection[i].trainerName;
                        if(this.user.type == 'trainee')
                        {
                            this.user.traineeSchedule = collection[i].traineeSchedule;
                        }
                        if(this.user.type == 'trainer'){
                        this.user.trainees = new Array<string>(collection[i].trainees.length)
                        for (let j = 0; j < collection[i].trainees.length; j++){
                            this.user.trainees[j] = collection[i].trainees[j];
                        }
                        this.user.trainerBlockArray = collection[i].trainerBlockArray;
                        this.user.finalSchedule = collection[i].finalSchedule;
                        this.user.canInputSchedule = collection[i].canInputSchedule;
                        this.user.scheduleToAlgorithem = collection[i].scheduleToAlgorithem;
                    }
                    }
                }
                if(this.user.type == 'trainee') {
                    for (let i = 0; i < collection.length; i++) {
                        if(this.user.trainerUID == collection[i].uid) {
                            this.insertTrainings = collection[i].canInputSchedule;
                            this.blockArray = collection[i].trainerBlockArray;
                        }
                }
            }
                return resolve(this.user);
            });
        })
    }
}