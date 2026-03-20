import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    setDoc, 
    query, 
    where, 
    orderBy, 
    limit, 
    doc, 
    onSnapshot,
    increment 
} from "firebase/firestore";

/**
 * Firebase Configuration
 * Environment variables are used to keep sensitive keys secure.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase App and Firestore Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Updates the search frequency for a given term in Firestore.
 * Uses the normalized search term as the document ID to prevent duplicates.
 * 
 * @param {string} searchTerm - The search query
 * @param {Object} movie - The movie object associated with the top result
 */
export const updateSearchCount = async (searchTerm, movie) => {
    if (!searchTerm || !movie) return;

    try {
        const normalizedTerm = searchTerm.trim().toLowerCase();
        const docRef = doc(db, "searchQueries", normalizedTerm);

        await setDoc(docRef, {
            searchTerm: normalizedTerm,
            count: increment(1),
            movie_id: movie.id,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
        }, { merge: true });

    } catch (error) {
        console.error("Error updating search count:", error);
    }
}

/**
 * Increments the view count for a specific movie to track "Trending" status.
 * Uses the movie ID as the document ID to prevent duplicates.
 * 
 * @param {Object} movie - The TMDB movie object being viewed
 */
export const updateMovieViewCount = async (movie) => {
    if (!movie || !movie.id) return;

    try {
        const docRef = doc(db, "trendingMovies", movie.id.toString());

        await setDoc(docRef, {
            movie_id: movie.id,
            count: increment(1),
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
        }, { merge: true });

    } catch (error) {
        console.error("Error updating movie view count:", error);
    }
}

/**
 * Real-time listener for top trending movies based on view count.
 * 
 * @param {Function} callback - Success callback receiving the trending movies list
 * @returns {Function} Unsubscribe function to stop listening
 */
export const getTrendingMovies = (callback) => {
    const trendingMoviesRef = collection(db, "trendingMovies");
    const q = query(trendingMoviesRef, orderBy("count", "desc"), limit(10));
    
    return onSnapshot(q, (querySnapshot) => {
        const trendingMovies = [];
        querySnapshot.forEach((doc) => {
            trendingMovies.push({ id: doc.id, ...doc.data() });
        });
        callback(trendingMovies);
    }, (error) => {
        console.error("Error with trending movies real-time listener:", error);
    });
}
