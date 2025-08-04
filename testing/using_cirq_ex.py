import cirq 

qubits = [cirq.LineQubit(0), cirq.LineQubit(1)]
swap_ops = [
    cirq.CNOT(qubits[0], qubits[1]),
    cirq.CNOT(qubits[1], qubits[0]),
    cirq.CNOT(qubits[0], qubits[1]),
    cirq.measure(qubits[0], key='a'),
    cirq.measure(qubits[1], key='b')
]
circuit = cirq.Circuit(swap_ops)
sim = cirq.Simulator()
result = sim.run(circuit, repetitions=1)
print(result)


