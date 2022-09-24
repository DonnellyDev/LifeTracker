
import {Chart} from "chart.js";

let foodDatas;

const SunToSat = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let foodData ={
    labels: SunToSat,
    datasets: [{
        label: 'Food Eaten Each Day',
        data:[foodDatas],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1

    }]

}

const data = {
    labels: SunToSat,
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};
const configWater = {
    type: 'bar',
    data: data,
    options: { scales: {
            y: {
                beginAtZero: true
            }
        }}
};
const configFood = {
    type: 'line',
    data: data,
    options: {
        plugins :{
            title:{
                display: true,
                text: 'Food Tracker for This Week'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }}
};
const configExpense = {
    type: 'doughnut',
    data: data,
    options: { }
};
const configExercise = {
    type: 'pie',
    data: data,
    options: { }
};
const foodChart = new Chart(
    document.getElementById('food_chart'),
    configFood
);
const waterChart = new Chart(
    document.getElementById('water_chart'),
    configWater
);
const exerciseChart = new Chart(
    document.getElementById('exercise_chart'),
    configExercise
);
const expenseChart = new Chart(
    document.getElementById('expense_chart'),
    configExpense
);