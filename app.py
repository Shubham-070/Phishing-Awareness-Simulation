from flask import Flask, render_template, request, jsonify
from database import save_participant, save_feedback

app = Flask(__name__)


@app.route("/")
def home():

    return render_template("index.html")


@app.route("/save-email", methods=["POST"])
def save_email():

    data = request.get_json()

    email = data.get("email")

    if not email:
        return jsonify({"success": False})

    save_participant(email)

    return jsonify({"success": True})


@app.route("/awareness")
def awareness():

    return render_template("awareness.html")


@app.route("/feedback", methods=["POST"])
def feedback():

    data = request.get_json()

    thought_real = data.get("thought_real")
    what_revealed = data.get("what_revealed")
    tried_login = data.get("tried_login")

    if not thought_real or not tried_login:

        return jsonify({
            "success": False,
            "message": "Please answer all required questions."
        })

    save_feedback(
        thought_real,
        what_revealed,
        tried_login
    )

    return jsonify({
        "success": True
    })


if __name__ == "__main__":

    app.run(debug=True)