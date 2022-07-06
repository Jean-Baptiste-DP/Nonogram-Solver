# Nonogram-Solver

Objectif of this website is to solve grids of Nonogram

The website is now accessible [here](https://jean-baptiste-dp.github.io/Nonogram-Solver/)

The resolution is done case by case so all Nonogram are not solvable with this algorithm.

The project is composed of 2 parts : calculation part and  graphic interface .

## Calculation

All the calculation is done using Javascript.

To solve Nonogram, we use 5 JS objects :

- plateau
- tasMax
- solveurLigne
- comparateur
- dispatcheur

And one main function, resolution() (contain in script.js)

### plateau

This object allow us to have an easy access to grid, columns and row.

### tasMax (eng max heap)

This object is a heap data structure, it allow us to add and remove elements quickly, and to remove element in decreasing order.

In our case, we use this object to register which of the lines must be treated.
The lines are ordered by the easily the algorithm can solve the line.

### solveurLigne (eng line solver)

This object allow us to fill a line with it configuration and cases on the line.

### comparateur

This object allow us to compare different possibility in one line.

### dispatcheur

This object allow us to have all the list of a certain length, composed of int, wich some up to a number.

For example, for length=3 and number=3, it give :

[[3,0,0],[2,1,0],[2,0,1],[1,2,0],[1,1,1],[1,0,2],[0,3,0],[0,2,1],[0,1,2],[0,0,3]]

## Graphic interface

The first version on the interface is done.

But I have new ideas of design, it will come later.

The interface is done with HTML, CSS and JS (file remplissageGrille.js)