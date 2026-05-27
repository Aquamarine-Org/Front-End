import { useMemo, useRef, useState } from "react";
import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import {
  IoAddOutline,
  IoCloseCircleOutline,
  IoEyeOutline,
  IoLinkOutline,
} from "react-icons/io5";
import { FaStairs } from "react-icons/fa6";
import styles from "./PlantaCasaPage.module.css";

const INITIAL_FLOORS = [
  {
    id: "terreo",
    name: "Térreo",
    rooms: [
      {
        id: "cozinha",
        name: "Cozinha",
        area: 12,
        width: 180,
        height: 260,
        x: 28,
        y: 16,
        hasSensor: true,
        sensorName: "Sensor da Cozinha",
        status: "normal",
        connections: ["banheiro"],
      },
      {
        id: "banheiro",
        name: "Banheiro",
        area: 12,
        width: 180,
        height: 160,
        x: 28,
        y: 315,
        hasSensor: true,
        sensorName: "Sensor do Banheiro",
        status: "risk",
        connections: ["cozinha"],
      },
    ],
  },
  {
    id: "andar-1",
    name: "1° Andar",
    rooms: [
      {
        id: "quarto",
        name: "Quarto",
        area: 16,
        width: 190,
        height: 170,
        x: 60,
        y: 60,
        hasSensor: false,
        sensorName: "",
        status: "normal",
        connections: ["banheiro-suite"],
      },
      {
        id: "banheiro-suite",
        name: "Banheiro suíte",
        area: 8,
        width: 170,
        height: 150,
        x: 310,
        y: 80,
        hasSensor: true,
        sensorName: "Sensor do Banheiro",
        status: "normal",
        connections: ["quarto"],
      },
    ],
  },
  {
    id: "andar-2",
    name: "2° Andar",
    rooms: [],
  },
];

const STATUS_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "risk", label: "Risco" },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function createRoom(index) {
  const id = `comodo-${Date.now()}`;

  return {
    id,
    name: `Novo cômodo ${index}`,
    area: 10,
    width: 180,
    height: 160,
    x: 250,
    y: 90,
    hasSensor: false,
    sensorName: "",
    status: "normal",
    connections: [],
  };
}

function PlantaCasaPage() {
  const canvasRef = useRef(null);
  const dragStateRef = useRef(null);
  const [floors, setFloors] = useState(INITIAL_FLOORS);
  const [activeFloorId, setActiveFloorId] = useState("terreo");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [connectorMode, setConnectorMode] = useState(false);
  const [connectorStartRoomId, setConnectorStartRoomId] = useState(null);

  const activeFloor = useMemo(
    () => floors.find((floor) => floor.id === activeFloorId) ?? floors[0],
    [activeFloorId, floors],
  );
  const activeRooms = useMemo(() => activeFloor?.rooms ?? [], [activeFloor]);
  const selectedRoom = activeRooms.find((room) => room.id === selectedRoomId);
  const sensorRooms = activeRooms.filter((room) => room.hasSensor);

  const connections = useMemo(() => {
    const roomById = new Map(activeRooms.map((room) => [room.id, room]));
    const uniqueConnections = new Map();

    activeRooms.forEach((room) => {
      room.connections.forEach((targetId) => {
        const targetRoom = roomById.get(targetId);

        if (!targetRoom) {
          return;
        }

        const key = [room.id, targetId].sort().join("-");
        uniqueConnections.set(key, {
          from: room,
          to: targetRoom,
        });
      });
    });

    return Array.from(uniqueConnections.values());
  }, [activeRooms]);

  const updateActiveRooms = (updater) => {
    setFloors((currentFloors) =>
      currentFloors.map((floor) =>
        floor.id === activeFloorId
          ? { ...floor, rooms: updater(floor.rooms) }
          : floor,
      ),
    );
  };

  const updateSelectedRoom = (field, value) => {
    if (!selectedRoom) {
      return;
    }

    updateActiveRooms((rooms) =>
      rooms.map((room) =>
        room.id === selectedRoom.id ? { ...room, [field]: value } : room,
      ),
    );
  };

  const toggleConnection = (sourceRoomId, targetRoomId) => {
    if (sourceRoomId === targetRoomId) {
      return;
    }

    updateActiveRooms((rooms) =>
      rooms.map((room) => {
        if (room.id !== sourceRoomId && room.id !== targetRoomId) {
          return room;
        }

        const oppositeId =
          room.id === sourceRoomId ? targetRoomId : sourceRoomId;
        const alreadyConnected = room.connections.includes(oppositeId);

        return {
          ...room,
          connections: alreadyConnected
            ? room.connections.filter((connectionId) => connectionId !== oppositeId)
            : [...room.connections, oppositeId],
        };
      }),
    );
  };

  const handleRoomClick = (roomId) => {
    setSelectedRoomId(roomId);

    if (!connectorMode) {
      return;
    }

    if (!connectorStartRoomId) {
      setConnectorStartRoomId(roomId);
      return;
    }

    if (connectorStartRoomId !== roomId) {
      toggleConnection(connectorStartRoomId, roomId);
    }

    setConnectorStartRoomId(null);
    setConnectorMode(false);
  };

  const handleRoomPointerDown = (event, room) => {
    if (connectorMode || event.button !== 0) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const roomRect = event.currentTarget.getBoundingClientRect();
    dragStateRef.current = {
      roomId: room.id,
      offsetX: event.clientX - roomRect.left,
      offsetY: event.clientY - roomRect.top,
    };
    setSelectedRoomId(room.id);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleCanvasPointerMove = (event) => {
    const dragState = dragStateRef.current;
    const canvas = canvasRef.current;

    if (!dragState || !canvas) {
      return;
    }

    const room = activeRooms.find(
      (currentRoom) => currentRoom.id === dragState.roomId,
    );

    if (!room) {
      return;
    }

    const canvasRect = canvas.getBoundingClientRect();
    const nextX = clamp(
      event.clientX - canvasRect.left - dragState.offsetX,
      0,
      canvasRect.width - room.width,
    );
    const nextY = clamp(
      event.clientY - canvasRect.top - dragState.offsetY,
      0,
      canvasRect.height - room.height,
    );

    updateActiveRooms((rooms) =>
      rooms.map((currentRoom) =>
        currentRoom.id === dragState.roomId
          ? { ...currentRoom, x: nextX, y: nextY }
          : currentRoom,
      ),
    );
  };

  const handleCanvasPointerUp = () => {
    dragStateRef.current = null;
  };

  const handleAddRoom = () => {
    const nextRoom = createRoom(activeRooms.length + 1);

    updateActiveRooms((rooms) => [...rooms, nextRoom]);
    setSelectedRoomId(nextRoom.id);
  };

  const handleAddFloor = () => {
    const nextFloorNumber = floors.length;
    const nextFloor = {
      id: `andar-${Date.now()}`,
      name: `${nextFloorNumber}° Andar`,
      rooms: [],
    };

    setFloors((currentFloors) => [...currentFloors, nextFloor]);
    setActiveFloorId(nextFloor.id);
    setSelectedRoomId(null);
    setConnectorMode(false);
    setConnectorStartRoomId(null);
  };

  const handleSelectFloor = (floorId) => {
    setActiveFloorId(floorId);
    setSelectedRoomId(null);
    setConnectorMode(false);
    setConnectorStartRoomId(null);
  };

  const handleDeleteRoom = () => {
    if (!selectedRoom) {
      return;
    }

    updateActiveRooms((rooms) =>
      rooms
        .filter((room) => room.id !== selectedRoom.id)
        .map((room) => ({
          ...room,
          connections: room.connections.filter(
            (connectionId) => connectionId !== selectedRoom.id,
          ),
        })),
    );
    setSelectedRoomId(null);
  };

  const startConnectorMode = () => {
    setConnectorMode(true);
    setConnectorStartRoomId(null);
  };

  return (
    <DashboardLayout
      pageTitle="Planta da Casa"
      currentPage="dashboard"
      pageTitleClassName={styles.pageTitle}
    >
      <section className={styles.floorPlanPage}>
        <article className={styles.editorPanel}>
          <aside className={styles.sidebarPanel}>
            <section className={styles.sideCard}>
              <h2>
                <FaStairs />
                Andares
              </h2>

              <div className={styles.floorList}>
                {floors.map((floor) => (
                  <button
                    key={floor.id}
                    type="button"
                    className={
                      floor.id === activeFloorId ? styles.activeFloor : ""
                    }
                    onClick={() => handleSelectFloor(floor.id)}
                  >
                    {floor.name}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className={styles.primarySideButton}
                onClick={handleAddFloor}
              >
                <IoAddOutline />
                novo andar
              </button>
            </section>

            <section className={styles.sideCard}>
              <h2>
                <IoEyeOutline />
                Sensores
              </h2>

              <div className={styles.sensorList}>
                {sensorRooms.length > 0 ? (
                  sensorRooms.map((room) => (
                    <button
                      type="button"
                      key={room.id}
                      className={
                        room.id === selectedRoomId ? styles.activeSensor : ""
                      }
                      onClick={() => setSelectedRoomId(room.id)}
                    >
                      <strong>{room.sensorName || `Sensor da ${room.name}`}</strong>
                      <span>{room.name}</span>
                    </button>
                  ))
                ) : (
                  <p className={styles.emptyList}>Nenhum sensor neste andar.</p>
                )}
              </div>
            </section>
          </aside>

          <section className={styles.mapSection}>
            <header className={styles.mapHeader}>
              <h2>{activeFloor?.name}</h2>

              <div className={styles.mapActions}>
                {connectorMode ? (
                  <span className={styles.connectorBadge}>
                    {connectorStartRoomId
                      ? "selecione o destino"
                      : "selecione a origem"}
                  </span>
                ) : null}

                <button
                  type="button"
                  className={styles.mapButton}
                  onClick={startConnectorMode}
                  disabled={activeRooms.length < 2}
                >
                  <IoLinkOutline />
                  novo conector
                </button>

                <button
                  type="button"
                  className={styles.mapButton}
                  onClick={handleAddRoom}
                >
                  <IoAddOutline />
                  novo cômodo
                </button>
              </div>
            </header>

            <div
              ref={canvasRef}
              className={styles.canvas}
              onPointerMove={handleCanvasPointerMove}
              onPointerUp={handleCanvasPointerUp}
              onPointerCancel={handleCanvasPointerUp}
            >
              <svg className={styles.connectionLayer} aria-hidden="true">
                {connections.map(({ from, to }) => (
                  <line
                    key={`${from.id}-${to.id}`}
                    x1={from.x + from.width / 2}
                    y1={from.y + from.height / 2}
                    x2={to.x + to.width / 2}
                    y2={to.y + to.height / 2}
                  />
                ))}
              </svg>

              {activeRooms.map((room) => (
                <article
                  key={room.id}
                  className={`${styles.roomCard} ${styles[room.status]} ${
                    room.id === selectedRoomId ? styles.selectedRoom : ""
                  } ${
                    room.id === connectorStartRoomId ? styles.connectorStart : ""
                  }`}
                  style={{
                    width: room.width,
                    height: room.height,
                    transform: `translate(${room.x}px, ${room.y}px)`,
                  }}
                  onClick={() => handleRoomClick(room.id)}
                  onPointerDown={(event) => handleRoomPointerDown(event, room)}
                >
                  <header className={styles.roomHeader}>
                    <h3>{room.name}</h3>

                    {room.hasSensor ? (
                      <span className={styles.sensorIcon}>
                        <IoEyeOutline />
                      </span>
                    ) : null}
                  </header>

                  <div className={styles.roomInfo}>
                    <span>{room.area}m²</span>
                    <span>
                      {room.hasSensor ? "1 sensor" : "sem sensor"}
                    </span>
                  </div>

                  <span
                    className={`${styles.roomStatus} ${
                      styles[`${room.status}Status`]
                    }`}
                  >
                    {room.status === "normal" ? "Normal" : "Risco"}
                  </span>
                </article>
              ))}

              {activeRooms.length === 0 ? (
                <div className={styles.emptyCanvas}>
                  <button type="button" onClick={handleAddRoom}>
                    <IoAddOutline />
                    novo cômodo
                  </button>
                </div>
              ) : null}
            </div>
          </section>

          <aside
            className={`${styles.inspectorPanel} ${
              selectedRoom ? styles.inspectorOpen : ""
            }`}
          >
            {selectedRoom ? (
              <>
                <div className={styles.inspectorHeader}>
                  <div>
                    <span>Cômodo selecionado</span>
                    <h2>{selectedRoom.name}</h2>
                  </div>

                  <button
                    type="button"
                    aria-label="Fechar painel"
                    onClick={() => setSelectedRoomId(null)}
                  >
                    <IoCloseCircleOutline />
                  </button>
                </div>

                <label className={styles.fieldGroup}>
                  Nome do cômodo
                  <input
                    value={selectedRoom.name}
                    onChange={(event) =>
                      updateSelectedRoom("name", event.target.value)
                    }
                  />
                </label>

                <div className={styles.fieldGrid}>
                  <label className={styles.fieldGroup}>
                    Área
                    <input
                      type="number"
                      min="1"
                      value={selectedRoom.area}
                      onChange={(event) =>
                        updateSelectedRoom(
                          "area",
                          Number(event.target.value) || 1,
                        )
                      }
                    />
                  </label>

                  <label className={styles.fieldGroup}>
                    Status
                    <select
                      value={selectedRoom.status}
                      onChange={(event) =>
                        updateSelectedRoom("status", event.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className={styles.fieldGrid}>
                  <label className={styles.fieldGroup}>
                    Largura
                    <input
                      type="number"
                      min="120"
                      max="320"
                      value={selectedRoom.width}
                      onChange={(event) =>
                        updateSelectedRoom(
                          "width",
                          Number(event.target.value) || 120,
                        )
                      }
                    />
                  </label>

                  <label className={styles.fieldGroup}>
                    Altura
                    <input
                      type="number"
                      min="120"
                      max="340"
                      value={selectedRoom.height}
                      onChange={(event) =>
                        updateSelectedRoom(
                          "height",
                          Number(event.target.value) || 120,
                        )
                      }
                    />
                  </label>
                </div>

                <label className={styles.switchField}>
                  <input
                    type="checkbox"
                    checked={selectedRoom.hasSensor}
                    onChange={(event) =>
                      updateSelectedRoom("hasSensor", event.target.checked)
                    }
                  />
                  Possui sensor instalado
                </label>

                {selectedRoom.hasSensor ? (
                  <label className={styles.fieldGroup}>
                    Nome do sensor
                    <input
                      value={selectedRoom.sensorName}
                      onChange={(event) =>
                        updateSelectedRoom("sensorName", event.target.value)
                      }
                    />
                  </label>
                ) : null}

                <section className={styles.connectionsEditor}>
                  <h3>Ligações</h3>

                  {activeRooms.length > 1 ? (
                    activeRooms
                      .filter((room) => room.id !== selectedRoom.id)
                      .map((room) => (
                        <label key={room.id} className={styles.connectionOption}>
                          <input
                            type="checkbox"
                            checked={selectedRoom.connections.includes(room.id)}
                            onChange={() =>
                              toggleConnection(selectedRoom.id, room.id)
                            }
                          />
                          {room.name}
                        </label>
                      ))
                  ) : (
                    <p>Nenhum outro cômodo neste andar.</p>
                  )}
                </section>

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={handleDeleteRoom}
                >
                  Remover cômodo
                </button>
              </>
            ) : (
              <div className={styles.emptyInspector}>
                Selecione um cômodo para editar.
              </div>
            )}
          </aside>
        </article>
      </section>
    </DashboardLayout>
  );
}

export default PlantaCasaPage;
