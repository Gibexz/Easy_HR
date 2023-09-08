from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_required, current_user
from sqlalchemy import or_
from datetime import datetime
from .model_user import User, Employee
from . import db

main = Blueprint('main', __name__)

@main.route('/')
def landing_page():
    return render_template('landing_page.html')

@main.route('/dashboard')
@login_required
def dashboard():
    # users=User.query.all()
    # count = 0
    # for user in users:
    #     count += 1

    count1 = 0
    numEmp = current_user.employees
    for employee in numEmp:
        count1 += 1

    employee = ""
    if count1 < 2:
        employee = 'employee'
    else:
        employee = 'employees'

    return render_template('dashboard.html', user=current_user.first_name,
                           employee=employee, emp_count=count1)

@main.route('/manage_emp')
@login_required
def manage_emp():
    employee = None
    return render_template('manage_employee.html', employee=employee)

@main.route('/add_employee', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def add_emp():
    if request.method == 'POST':
        user_id = current_user.id

        firstName = request.form.get("firstName") 
        middleName = request.form.get("middleName") 
        lastName = request.form.get("lastName")
        email = request.form.get("email")
        phoneNumber = request.form.get("phoneNumber") 
        address = request.form.get("address") 
        nationality = request.form.get("nationality") 
        stateOfOrigin = request.form.get("stateOfOrigin") 
        employeeID = request.form.get("employeeID") 
        level = request.form.get("level") 
        salary = request.form.get("salary") 
        branch = request.form.get("branch") 
        department = request.form.get("department") 
        DateOfEmployment = datetime.strptime(request.form.get("DateOfEmployment"), '%Y-%m-%d').date()
        dateOfBirth = datetime.strptime(request.form.get("dateOfBirth"), '%Y-%m-%d').date() 
        gender = request.form.get("gender")

        #to ensure emails are unqiue per employee
        emps = current_user.employees
        for emp in emps:
            if emp.email == email:
        # [employee_emails for employees.email in  current_user.employees]
        # [exists for email in employee_emails]
        # if exists:
                # return jsonify({"success": False, "message": "Employee with this email already exists"})
                flash('Employee with this email already exists')
                return redirect(url_for('main.manage_emp'))
            if emp.employeeID == employeeID:
                # return jsonify({"success": False, "message": "Employee with this email already exists"})
                flash('Employee with this ID already exists')
                return redirect(url_for('main.manage_emp'))

        new_employee = Employee(user_id=user_id, firstName=firstName, middleName=middleName,
                                lastName=lastName, email=email, phoneNumber=phoneNumber,
                                address=address, nationality=nationality, stateOfOrigin=stateOfOrigin,
                                employeeID=employeeID, level=level, salary=salary,
                                branch=branch, department=department, DateOfEmployment=DateOfEmployment,
                                dateOfBirth=dateOfBirth, gender=gender)
        db.session.add(new_employee)
        db.session.commit()
        return redirect(url_for('main.manage_emp'))
    return url_for('main.manage_emp')


# @main.route('/get_employee_details', strict_slashes=False, methods=['GET', 'POST'])
# @login_required
# def get_employee_details():
#     if request.method == 'POST':
#         # Retrieve the employee ID from the form
#         # employeeID = request.form.get("employeeID")
#         data = request.get_json()  # Get JSON data from the request
#         employeeID = data.get("employeeID")

#         # Query the database for the employee with the employeeID for the current user
#         # employee_list = current_user.employees
#         # for employee in employee_list:
#         #     if employee.employeeID == employeeID:
#         #         return render_template('manage_employee.html', employee=employee)


#         employee = Employee.query.filter_by(employeeID=employeeID, user_id=current_user.id).first()

#         # Check if the employee exists and belongs to the currently logged-in user
#         if not employee:
#             flash('Employee does not exist')
#             return redirect(url_for('main.manage_emp'))
#         print("Employee:", employee)
        
#         # Return the employee details to the page
    
#         return render_template('manage_employee.html', employee=employee)
#     return render_template('manage_employee.html')

@main.route('/get_employee_details', strict_slashes=False, methods=['POST'])
@login_required
def get_employee_details():
    if request.is_json and request.method == 'POST': 
        data = request.get_json()  # Get JSON data from the request
        employeeID = data.get("employeeID")

        # Query the database for the employee with the employeeID for the current user
        employee = Employee.query.filter_by(employeeID=employeeID, user_id=current_user.id).first()

        # Check if the employee exists and belongs to the currently logged-in user
        if not employee:
            return jsonify({"success": False, "message": "Employee does not exist"})

        newDateOfEmployment = employee.DateOfEmployment.strftime("%Y-%m-%d")
        newDateOfBirth = employee.dateOfBirth.strftime("%Y-%m-%d")
        # Prepare a dictionary with employee details
        employee_details = {
            "firstName": employee.firstName,
            "middleName": employee.middleName,
            "lastName": employee.lastName,
            "email": employee.email,
            "phoneNumber": employee.phoneNumber,
            "address": employee.address,
            "nationality": employee.nationality,
            "stateOfOrigin": employee.stateOfOrigin,
            "employeeID": employee.employeeID,
            "level": employee.level,
            "salary": employee.salary,
            "branch": employee.branch,
            "department": employee.department,
            "DateOfEmployment": newDateOfEmployment,
            "dateOfBirth": newDateOfBirth,
            "gender": employee.gender,
            # Add other employee details here
        }

        # Return the employee details as JSON response
        return jsonify({"success": True, "employee": employee_details})

    # Handle GET requests if needed
    return jsonify({"success": False, "message": "GET request not allowed"})

@main.route('/update_employee', strict_slashes=False, methods=['POST'])
@login_required
def update_employee():
    if request.method == 'POST':
        employeeID = request.form.get("employeeID")
        # name = request.form.get("lastName")

        # Query the database to find the employee by ID
        employee = Employee.query.filter_by(employeeID=employeeID, user_id=current_user.id).first()

        if not employee:
            return jsonify({"success": False, "message": f"Employee with ID {employeeID} not found"})
        
        # employee_data = ["firstName", "middleName", "lastName", "email", "phoneNumber", "address", "nationality", "stateOfOrigin", "level", "salary", "branch", "department", "DateOfEmployment", "dateOfBirth", "gender"]

        
        # Update employee fields based on form data
        employee.firstName = request.form.get("firstName")
        employee.middleName = request.form.get("middleName")
        employee.lastName = request.form.get("lastName")
        employee.email = request.form.get("email")
        employee.phoneNumber = request.form.get("phoneNumber")
        employee.address = request.form.get("address")
        employee.nationality = request.form.get("nationality")
        employee.stateOfOrigin = request.form.get("stateOfOrigin")
        employee.level = request.form.get("level")
        employee.salary = request.form.get("salary")
        employee.branch = request.form.get("branch")
        employee.department = request.form.get("department")
        if employee.DateOfEmployment == None:
            pass
        else:
            employee.DateOfEmployment = datetime.strptime(request.form.get("DateOfEmployment"), '%Y-%m-%d').date()
        if employee.dateOfBirth == None:
            pass
        else:
            employee.dateOfBirth = datetime.strptime(request.form.get("dateOfBirth"), '%Y-%m-%d').date()
        employee.gender = request.form.get("gender")
        # employeez = request.form.get("DateOfEmployment")
        # return jsonify({"success": False, "message": f"Employee with ID {employeez} found"})

        try:
            db.session.commit()
            return jsonify({"success": True, "message": "Employee updated successfully"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"success": False, "message": "Failed to update employee: " + str(e)})

    return jsonify({"success": False, "message": "GET request not allowed"})


@main.route('/view_employees', strict_slashes=False, methods=['GET'])
@login_required
def view_employees():
    """View all employees for the current user."""

    employee_data = Employee.query.filter_by(user_id=current_user.id).all()
    write_up = f"Employee List"

    return render_template('view_employee.html', view_employees=employee_data, write_up=write_up)


@main.route('/view_employee/<id_or_name>', strict_slashes=False, methods=['GET'])
@login_required
def view_employee(id_or_name):
    """view all employees or specific employees(using name or id)"""
    write_up = f"Click the View all button below to view all employee information"

    employee_data = Employee.query.filter(
        (Employee.employeeID==id_or_name) |
        (Employee.firstName==id_or_name)|
        (Employee.middleName == id_or_name)|
        (Employee.lastName == id_or_name), Employee.user_id == current_user.id).all()
    if employee_data is not None:
            return render_template('view_employee.html', view_employees=employee_data, write_up=write_up)
    else:
        return render_template('view_employee.html', view_employees="None")
