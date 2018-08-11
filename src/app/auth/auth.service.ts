import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

// need injectable as want to inject other services into this service
@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) {}

    signupUser(email: string, password: string) {
        // inbuilt firebase function to sign up user
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )
    }

    signinUser(email: string, password: string) {
        // inbuilt firebase function to sign in user
        // once signed in, get user id token and store locally
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    // when sign in successful, navigate back to homepage
                    this.router.navigate(['/'])
                    firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    )
                }
            ).catch(
                error => console.log(error)
            )
    }

    // firebase logout function & set local token var to null
    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    // get user id token and store in local variable
    getIdToken() {
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => this.token = token
        );
        return this.token;
    }

    // check if user signed in by checking if they have a token
    isAuthenticated() {
        return this.token != null;
    }
}