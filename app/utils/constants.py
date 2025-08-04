from enum import Enum


class Gate(Enum):
    X = "X"
    H = "H"
    S = "S"
    T = "T"
    CNOT = "CNOT"
    CZ = "CZ"
    SWAP = "SWAP"


class TargetLibraryField(Enum):
    NUM_QUBITS = "num_qubits"
    GATES = "gates"
    QUBIT_ORDER = "qubit_order"


class HttpStatus(Enum):
    SUCCESS = 200
    CREATED = 201
    ACCEPTED = 202
    NO_CONTENT = 204
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404
    METHOD_NOT_ALLOWED = 405
    CONFLICT = 409
    INTERNAL_SERVER_ERROR = 500
    NOT_IMPLEMENTED = 501
    BAD_GATEWAY = 502
    SERVICE_UNAVAILABLE = 503


class RequestKey(Enum):
    METHOD = "method"
    URL = "url"
    HEADERS = "headers"
    PARAMS = "params"
    DATA = "data"
    JSON = "json"
    TIMEOUT = "timeout"
    AUTH = "auth"
    COOKIES = "cookies"
    STATUS = "status"
    MESSAGE = "message"
    CODE = "code"
