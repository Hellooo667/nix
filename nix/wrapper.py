import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    query = data.get('query', '')
    try:
        proc = subprocess.Popen(['/home/hari/nix/.venv/bin/gemini-cli'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd='/home/hari/nix')
        proc.stdin.write(query + '\n')
        proc.stdin.flush()
        response, error = proc.communicate(timeout=30)
        if proc.returncode == 0:
            return jsonify({'response': response.strip()})
        else:
            return jsonify({'response': f'Error: {error.strip()}'})
    except Exception as e:
        return jsonify({'response': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
