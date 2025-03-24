from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Configure Database
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Get current directory
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(BASE_DIR, "users.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize Database & Bcrypt
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Define User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Create Database Tables
with app.app_context():
    db.create_all()

# ✅ Home Route
@app.route('/')
def home():
    return "Welcome to homepage"

# ✅ Dashboard Route
@app.route('/dashboard')
def dashboard():
    return "Welcome to the Dashboard!"

# ✅ Register Route
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        # Validation: Ensure email and password are provided
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Check if email already exists
        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email already exists!"}), 400

        # Hash password
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # Create new user
        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "Registration successful!"}), 201

    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify({'error': str(e)}), 500

    finally:
        db.session.close()  # Ensure the session is closed

# ✅ Login Route
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        # Find user in database
        user = User.query.filter_by(email=email).first()

        # Check password
        if user and bcrypt.check_password_hash(user.password, password):
            return jsonify({"message": "Login successful!"}), 200

        return jsonify({"message": "Invalid email or password!"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.session.close()  # Ensure the session is closed

# Run the app
if __name__ == "__main__":
    print("Server is running. Try accessing http://127.0.0.1:5000/")
    app.run(debug=True)
