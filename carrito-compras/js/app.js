//Variables
const carrito = document.getElementById('carrito');
const listaCursos = document.getElementById('lista-cursos');



//Functions

const getCoursesFromLocalStorage = () => localStorage.getItem('courses') ? JSON.parse(localStorage.getItem('courses')) : [];

const getCourseOnClick = (e) => {
    const curso = e.target.parentElement.parentElement;
    return curso;
}

const readDataCourse = (curso) => {
    return {
        title: curso.querySelector('.info-card h4').textContent,
        price: curso.querySelector('.precio').textContent,
        offerPrice: curso.querySelector('.precio span').textContent,
        imgSource: curso.querySelector('.imagen-curso').src,
        id: curso.querySelector('a').getAttribute('data-id'),
    }
}

const insertOnLS = (course) => {
    let courses = getCoursesFromLocalStorage();
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
}

const insertOnCart = (courseData) => {
    const courseTable = document.querySelector('#lista-carrito tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${courseData.imgSource}" width=100/>
        </td>
        <td>${courseData.title}</td>
        <td>${courseData.offerPrice}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${courseData.id}">X</a>
        </td>
    `;

    courseTable.appendChild(row);

    return row;
}

//get courses on cart at doc loading
const initializeCourses = () => {
    getCoursesFromLocalStorage().forEach(course => insertOnCart(course));
}
 
//Add Course to cart & local storage
const addCourseToCart = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const courseData = readDataCourse(getCourseOnClick(e));
        insertOnCart(courseData);
        insertOnLS(courseData);
    }
}

//Delete cart course from DOM
const deleteFromCart = (e) => {
    e.target.parentElement.parentElement.remove();
}

//Delete cart course from LS
const deleteFromLS = (e) => {
    const courseId = e.target.getAttribute('data-id');
    let courses = getCoursesFromLocalStorage();
    courses = courses.filter(course => course.id != courseId);
    localStorage.setItem('courses', JSON.stringify(courses));
    
}

//Empty Cart
const emptyCart = (e) => {
    document.querySelectorAll('#lista-carrito tbody tr').forEach(item => item.remove());
    localStorage.removeItem('courses');
}

//handleClickOnCart
const handleClickOnCart = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        deleteFromLS(e);
        deleteFromCart(e);
    } else if (e.target.id == 'vaciar-carrito'){
        emptyCart(e);
    }
}

//Listeners
(function () {
    //al agregar a carrito
    listaCursos.addEventListener('click', addCourseToCart);

    //click en carrito
    carrito.addEventListener('click', handleClickOnCart);

    //cargar cursos en dom load
    document.addEventListener('DOMContentLoaded', initializeCourses);
})();
    