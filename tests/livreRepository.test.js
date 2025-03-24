import { Livre } from "../models/Livre"
import { livreRepository } from "../repositories/livreRepository";
import { describe, test, expect } from "vitest";

// describe("insertion d'un livre dans la BBDD", () => {
//     describe("Succés...", () => {
//         test("Un livre non existant est bien crée", () => {

//             const livre = {
//                 id: null, // ID sera généré par la base de données
//                 titre: "viaje a la luna",
//                 ISBN: "123456123456789456",
//                 annee_Publication: 2010,
//                 nb_Pages: 200,
//                 editeur: 1
//             }
   
//             const result = livreRepository.createLivre(livre);

//             assert(result.changes == 1);
//         })
//     });

//     describe("Error...", () => {

//     });   
// });

// // Recherche d'un livre dans la BBDD

// describe("Recherche d'un livre dans la BBDD", () => {
//     describe("Succés...", () => {
//         test("Un livre existe bien dans la BBDD", () => {

//             const livre = {
//                 id: null, // ID sera généré par la base de données
//                 titre: "1984",
//                 ISBN: "9780451524935",
//                 annee_Publication: 1949,
//                 nb_Pages: 328,
//                 editeur: 2
//             }
   
//             const result = livreRepository.findLivreById(1);

//             assert.equal(result.titre, livre.titre) && 
//         })
//     });

//     describe("Error...", () => {

//     });   
// });





// import { expect } from 'vitest';

// const livres = [
//   { id: 1, titre: '1984', auteur: 'George Orwell' },
//   { id: 2, titre: 'Le Meilleur des Mondes', auteur: 'Aldous Huxley' },
// ];

// // Assert que c'est bien un tableau
// expect(Array.isArray(livres)).toBe(true);
// expect(livres.length).toBeGreaterThan(0);

// // Assert que chaque élément est bien un "Livre"
// livres.forEach((livre) => {
//   expect(livre).toMatchObject({
//     id: expect.any(Number),
//     titre: expect.any(String),
//     auteur: expect.any(String),
//   });
// });


import { describe, test, expect, vi } from 'vitest'

// Exemple de fonction qui utilise une API externe
async function fetchCreateLivre(apiClient, livreId) {
  const response = await apiClient.get(`/livres/${livreId}`)
  return response.data
}

describe('fetchCreateLivre()', () => {
  test('devrait retourner les données dun livre concret', async () => {
    // Création d'un mock pour apiClient
    const mockApiClient = {
      get: vi.fn().mockResolvedValue({
        data: { id: 1, name: 'Alice' }
      })
    }

    const user = await fetchUser(mockApiClient, 1)

    // On vérifie que le mock a été appelé correctement
    expect(mockApiClient.get).toHaveBeenCalledWith('/users/1')
    
    // On vérifie le résultat retourné par la fonction
    expect(user).toEqual({ id: 1, name: 'Alice' })
  })

  test('devrait gérer les erreurs de l\'API', async () => {
    const mockApiClient = {
      get: vi.fn().mockRejectedValue(new Error('Network Error'))
    }

    // Ici, on s'attend à ce que la promesse soit rejetée
    await expect(fetchUser(mockApiClient, 2)).rejects.toThrow('Network Error')
  })
})
