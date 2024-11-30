from flask import Blueprint, request, jsonify
from app.models import db, Task, AdminUser
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import logging


tasks_blueprint = Blueprint('tasks', __name__)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@tasks_blueprint.route('/routes', methods=['GET'])
def show_routes():
    routes = []
    for rule in app.url_map.iter_rules():
        routes.append(f"{rule.endpoint} -> {rule}")
    return jsonify(routes)


@tasks_blueprint.route('/api/tasks', methods=['GET'])
def get_tasks():
    try:
        page = request.args.get('page', 1, type=int)
        sort_by = request.args.get('sort_by', 'username', type=str)

        valid_sort_fields = ['username', 'email', 'completed']
        if sort_by not in valid_sort_fields:
            return jsonify({"message": "Invalid sort field"}), 400

        tasks = Task.query.order_by(getattr(Task, sort_by)).paginate(page, 3, False)

        return jsonify([task.to_dict() for task in tasks.items])

    except Exception as e:
        logger.error(f"Error retrieving tasks: {e}")
        return jsonify({"error": str(e)}), 500


@tasks_blueprint.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    task = Task(username=data['username'], email=data['email'], text=data['text'])
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201


@tasks_blueprint.route('/api/tasks/<int:id>', methods=['PATCH'])
@jwt_required()
def edit_task(id):
    current_user_id = get_jwt_identity()
    admin = AdminUser.query.get(current_user_id)

    if not admin:
        return jsonify({"message": "Admin privileges required"}), 403

    task = Task.query.get_or_404(id)
    data = request.get_json()
    print(f"Parsed Data: {data}")

    if 'text' in data:
        task.text = data['text']
    if 'completed' in data:
        task.completed = data['completed']

    db.session.commit()
    return jsonify(task.to_dict())


@tasks_blueprint.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    admin = AdminUser.query.filter_by(username=data['username']).first()

    if admin and admin.check_password(data['password']):
        access_token = create_access_token(identity=str(admin.id))
        return jsonify(access_token=access_token), 200

    return jsonify({'message': 'Invalid credentials'}), 401
