import { CurriculumSubject } from "./types";

export const cnCurriculum: CurriculumSubject = {
  id: "cn",
  name: "Computer Networks",
  shortName: "Networks",
  category: "core-systems",
  description: "Follow packet journeys from link frames to application payloads: Ethernet, IP subnetting, ARP, DNS, TCP reliability, TLS 1.3, and modern HTTP.",
  longDescription: "Understand the layered architecture that allows millions of heterogeneous devices to reliably communicate across lossy, unordered physical networks.",
  accentColor: "#06B6D4",
  borderColor: "rgba(6, 182, 212, 0.3)",
  badgeBg: "rgba(6, 182, 212, 0.1)",
  iconName: "Network",
  coreQuestion: "How does TCP guarantee in-order, loss-free byte stream delivery across an inherently unreliable and out-of-order IP packet network?",
  prerequisites: ["Basic Computer Systems", "Binary & Bitwise Operations", "Basic Operating Systems (Sockets & Schedulers)"],
  learningOutcomes: [
    "Trace packet encapsulation and decapsulation across the 5-layer Internet stack (Frame -> Packet -> Segment -> Payload).",
    "Calculate IPv4 CIDR subnets, broadcast addresses, and host ranges, and explain Network Address Translation (NAT).",
    "Analyze the TCP state machine, 3-way handshake, 4-way teardown, and sequence number synchronization.",
    "Formulate TCP flow control (sliding window) and congestion control algorithms (Slow Start, Congestion Avoidance, Fast Retransmit, CUBIC).",
    "Trace hierarchical DNS resolution across Root, TLD, and Authoritative nameservers.",
    "Compare HTTP/1.1, HTTP/2 binary multiplexing, and HTTP/3 over QUIC, and trace the 1-RTT TLS 1.3 handshake."
  ],
  keyMechanisms: [
    "TCP 3-Way Handshake & Sequence Number Sync",
    "Sliding Window Flow Control (rwnd)",
    "Additive Increase Multiplicative Decrease (AIMD / CUBIC)",
    "Diffie-Hellman Ephemeral Key Exchange (TLS 1.3)",
    "DNS Hierarchical Caching & Anycast Routing"
  ],
  modules: [
    {
      id: "cn-mod-1",
      order: 1,
      title: "Networking Fundamentals & Packet Switching",
      shortDescription: "Packet switching vs circuit switching, delay components, jitter, and packet loss.",
      detailedOverview: "Examine how data traverses the physical world. Contrast circuit-switched telecommunication networks with packet-switched Internet architectures, and analyze the four components of network latency (propagation, transmission, queuing, processing).",
      difficulty: "Foundation",
      interviewBenchmark: "Calculate total packet transmission latency given bandwidth, packet length, propagation speed, and link distance.",
      topics: [
        {
          id: "cn-t-1-1",
          title: "Network Core & Latency Fundamentals",
          description: "Packet switching vs circuit switching and the 4 delay components.",
          difficulty: "Foundation",
          learningObjectives: ["Contrast packet vs circuit switching", "Calculate network latency components"],
          subtopics: [
            {
              id: "cn-st-1-1-1",
              title: "The Four Delay Components (Nodal Delay)",
              description: "Processing delay, Queuing delay, Transmission delay (L/R), and Propagation delay (d/s).",
              difficulty: "Foundation",
              keyTakeaways: [
                "Transmission delay (L/R) is the time to push packet bits onto the wire (depends on packet size L and link bandwidth R).",
                "Propagation delay (d/s) is the time for a bit to travel through the physical medium at the speed of light (depends on distance d and medium speed s)."
              ],
              concepts: ["Transmission Delay", "Propagation Delay", "Queuing Delay", "Bandwidth-Delay Product (BDP)"],
              questions: [
                {
                  id: "cn-q-1",
                  statement: "Why does increasing network bandwidth from 10 Mbps to 1 Gbps reduce transmission delay but have zero effect on propagation delay?",
                  type: "Analytical",
                  difficulty: "Foundation",
                  explanation: "Bandwidth dictates how rapidly the transmitter can push bits onto the wire (L/R). Once on the wire, the physical signal travels at the speed of light in copper/fiber (~200,000 km/s), which depends solely on physical distance and medium properties, not network bandwidth."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-2",
      order: 2,
      title: "Network Models & Protocol Architecture",
      shortDescription: "OSI 7-Layer vs TCP/IP 4-Layer models, encapsulation, and protocol boundaries.",
      detailedOverview: "Deconstruct layered network abstractions. Understand how data is encapsulated with protocol headers at each boundary (Data -> Segment -> Packet -> Frame -> Bits) and why modular layer separation enables independent protocol evolution.",
      difficulty: "Foundation",
      interviewBenchmark: "Trace packet encapsulation and decapsulation as data travels from an application down through hardware and back up.",
      topics: [
        {
          id: "cn-t-2-1",
          title: "Layered Architecture & Encapsulation",
          description: "OSI vs TCP/IP mapping and header encapsulation.",
          difficulty: "Foundation",
          learningObjectives: ["Map OSI layers to TCP/IP layers", "Trace packet encapsulation headers"],
          subtopics: [
            {
              id: "cn-st-2-1-1",
              title: "Encapsulation, Decapsulation & Protocol Data Units (PDUs)",
              description: "How each layer prepends metadata headers without inspecting higher-layer payloads.",
              difficulty: "Foundation",
              keyTakeaways: [
                "Layer 4 (Transport) creates Segments (TCP) or Datagrams (UDP) with port numbers.",
                "Layer 3 (Network) creates Packets with IP addresses; Layer 2 (Data Link) wraps packets in Frames with MAC addresses."
              ],
              concepts: ["PDU", "Segment", "Packet", "Frame", "Header Overhead"],
              questions: [
                {
                  id: "cn-q-2",
                  statement: "What layer of the OSI model does an IP router operate at, and does it inspect TCP sequence numbers?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "A standard IP router operates at Layer 3 (Network Layer). It inspects only Layer 2 (Ethernet frame to strip it) and Layer 3 (IP header for routing destination). It treats the Layer 4 TCP segment as opaque payload and does not inspect sequence numbers."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-3",
      order: 3,
      title: "Physical & Data Link Layers (Framing & Error Detection)",
      shortDescription: "Framing, parity, checksums, and Cyclic Redundancy Checks (CRC).",
      detailedOverview: "Explore how unreliable physical mediums detect bit corruption. Study framing methods, byte stuffing, and mathematical error detection algorithms including 1's complement checksums and polynomial Cyclic Redundancy Checks (CRC).",
      difficulty: "Foundation",
      interviewBenchmark: "Calculate a CRC checksum using polynomial long division given a data bit string and generator polynomial.",
      topics: [
        {
          id: "cn-t-3-1",
          title: "Error Detection Mechanisms",
          description: "Parity bits, Internet checksums, and CRC polynomial division.",
          difficulty: "Intermediate",
          learningObjectives: ["Calculate Cyclic Redundancy Check (CRC)", "Compare Checksum vs CRC error detection power"],
          subtopics: [
            {
              id: "cn-st-3-1-1",
              title: "Cyclic Redundancy Check (CRC) Polynomial Division",
              description: "Binary modulo-2 arithmetic (XOR) for hardware-accelerated frame verification.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "CRC treats bit strings as polynomials and divides by a standardized generator polynomial using XOR arithmetic.",
                "CRC detects all single-bit errors, all double-bit errors, any odd number of errors, and all burst errors shorter than the polynomial degree."
              ],
              concepts: ["CRC-32", "Polynomial Division", "Modulo-2 Arithmetic", "Frame Check Sequence (FCS)"],
              questions: [
                {
                  id: "cn-q-3",
                  statement: "Why is CRC used at the Data Link layer (Ethernet) while a simple 1's complement addition checksum is used in TCP and IP headers?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "CRC provides superior error detection for burst errors caused by physical medium noise and is easily implemented in hardware (NIC shift registers). TCP/IP checksums are executed in software on the host CPU, where simple addition is faster to compute."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-4",
      order: 4,
      title: "Ethernet, MAC Addressing & LAN Switching",
      shortDescription: "Ethernet frames, MAC addresses, switch forwarding tables, and ARP.",
      detailedOverview: "Study local area network communication. Examine 48-bit MAC addresses, CSMA/CD historical collision detection, modern full-duplex Ethernet switches, self-learning MAC forwarding tables, and the Address Resolution Protocol (ARP).",
      difficulty: "Foundation",
      interviewBenchmark: "Explain what happens when Host A sends a packet to Host B on the same local subnet when Host A's ARP cache is empty.",
      topics: [
        {
          id: "cn-t-4-1",
          title: "Switching & Address Resolution Protocol (ARP)",
          description: "Self-learning switches, broadcast domains, and IP-to-MAC resolution.",
          difficulty: "Foundation",
          learningObjectives: ["Trace ARP request broadcast and unicast reply", "Understand switch forwarding tables"],
          subtopics: [
            {
              id: "cn-st-4-1-1",
              title: "Address Resolution Protocol (ARP) Execution Flow",
              description: "Mapping a 32-bit logical IP address to a 48-bit physical MAC address on a local link.",
              difficulty: "Foundation",
              keyTakeaways: [
                "ARP sends a broadcast frame (destination MAC FF:FF:FF:FF:FF:FF) asking 'Who has IP X.X.X.X? Tell me.'",
                "The target host responds with a unicast ARP reply containing its physical MAC address, which the sender caches in its ARP table."
              ],
              concepts: ["ARP Request (Broadcast)", "ARP Reply (Unicast)", "ARP Cache", "Gratuitous ARP"],
              questions: [
                {
                  id: "cn-q-4",
                  statement: "Can an ARP request be routed across an Internet router to reach a destination in a different country?",
                  type: "Interview",
                  difficulty: "Foundation",
                  explanation: "No. ARP operates at Layer 2 inside a single local broadcast domain. Routers do not forward Layer 2 broadcast frames. To reach an external host, the sending host issues an ARP request for its local Default Gateway's MAC address."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-5",
      order: 5,
      title: "Network Layer: IP Addressing & Subnetting",
      shortDescription: "IPv4 header, CIDR subnetting, IPv6 architecture, and Network Address Translation (NAT).",
      detailedOverview: "Master network layer addressing. Learn Classless Inter-Domain Routing (CIDR), variable-length subnet masks (VLSM), IP fragmentation, IPv6 transitions, and Network Address Translation (NAT) port mapping.",
      difficulty: "Intermediate",
      interviewBenchmark: "Given a /24 network, divide it into 4 subnets of equal size and determine the network address, broadcast address, and usable IP range for each.",
      topics: [
        {
          id: "cn-t-5-1",
          title: "IPv4 Addressing & CIDR Subnetting",
          description: "Classless Inter-Domain Routing, prefix lengths, and subnet masks.",
          difficulty: "Intermediate",
          learningObjectives: ["Calculate CIDR subnets and broadcast addresses", "Analyze IP fragmentation and MTU"],
          subtopics: [
            {
              id: "cn-st-5-1-1",
              title: "Subnetting Math: Network vs Host Bits",
              description: "Binary masking to determine subnet boundaries and host capacities.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A /N CIDR prefix allocates N bits to the network ID and (32 - N) bits to hosts.",
                "Usable host count is 2^(32 - N) - 2 (subtracting all-zeros network address and all-ones broadcast address)."
              ],
              concepts: ["CIDR", "Subnet Mask", "Network Address", "Broadcast Address", "VLSM"],
              questions: [
                {
                  id: "cn-q-5",
                  statement: "Calculate the network address, broadcast address, and number of usable host addresses for 192.168.10.130/26.",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "/26 leaves 6 host bits (2^6 = 64 addresses per block). Block intervals: 0-63, 64-127, 128-191. 130 falls in the 3rd block. Network address = 192.168.10.128. Broadcast address = 192.168.10.191. Usable host range = 192.168.10.129 to 192.168.10.190 (62 usable hosts)."
                }
              ]
            },
            {
              id: "cn-st-5-1-2",
              title: "Network Address Translation (NAT) & Private IPs",
              description: "Port Address Translation (NAPT) mapping private RFC 1918 addresses to public IPs.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "NAT allows an entire private local network (e.g. 192.168.0.0/16) to share a single public IPv4 address.",
                "The NAT router maintains a translation table mapping `(PrivateIP, PrivatePort) <-> (PublicIP, PublicPort)` and rewrites IP and TCP headers on the fly."
              ],
              concepts: ["NAT", "PAT", "RFC 1918", "NAT Traversal", "UPnP / STUN"],
              questions: [
                {
                  id: "cn-q-6",
                  statement: "How does Network Address Translation (NAT) violate the original end-to-end principle of the Internet?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "The end-to-end principle states that network core nodes (routers) should only forward packets without modifying payloads or higher-layer headers. NAT breaks this by modifying IP addresses and TCP/UDP port numbers and prevents external nodes from initiating direct connections to internal hosts without port forwarding."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-6",
      order: 6,
      title: "Routing Algorithms & Protocols (OSPF & BGP)",
      shortDescription: "Link-State (Dijkstra), Distance-Vector (Bellman-Ford), OSPF, and BGP inter-domain routing.",
      detailedOverview: "Study how routers find optimal paths across global networks. Compare Link-State algorithms (OSPF using Dijkstra) with Distance-Vector algorithms (RIP using Bellman-Ford), and analyze Border Gateway Protocol (BGP) policy routing.",
      difficulty: "Advanced",
      interviewBenchmark: "Explain the Count-to-Infinity problem in distance-vector routing and how Split Horizon with Poison Reverse mitigates it.",
      topics: [
        {
          id: "cn-t-6-1",
          title: "Routing Algorithms: Link-State vs Distance-Vector",
          description: "Dijkstra's shortest path vs Bellman-Ford, and BGP Autonomous Systems.",
          difficulty: "Advanced",
          learningObjectives: ["Simulate Dijkstra Link-State routing", "Explain BGP path vector policy routing"],
          subtopics: [
            {
              id: "cn-st-6-1-1",
              title: "Link-State (Dijkstra) vs Distance-Vector (Bellman-Ford)",
              description: "Global network topology flooding vs decentralized neighbor distance sharing.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Link-State (OSPF) floods link costs to all routers; every router runs Dijkstra locally to compute shortest paths.",
                "Distance-Vector (RIP) exchanges distance vectors only with immediate neighbors; susceptible to the Count-to-Infinity loop problem."
              ],
              concepts: ["Dijkstra Routing", "Bellman-Ford", "Count-to-Infinity", "Split Horizon", "BGP Autonomous Systems"],
              questions: [
                {
                  id: "cn-q-7",
                  statement: "Why does the Internet use BGP (Path-Vector) between Autonomous Systems (AS) instead of a pure shortest-path algorithm like OSPF?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Because global inter-domain routing is governed by business, geopolitical, and economic transit policies (e.g. 'do not route traffic through competitor X'), not shortest physical distance. BGP records the full AS-PATH to enforce policy and prevent routing loops across millions of networks."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-7",
      order: 7,
      title: "Transport Layer Fundamentals & UDP",
      shortDescription: "Port multiplexing, UDP characteristics, and real-time streaming.",
      detailedOverview: "Examine end-to-end host-to-host process communication. Study 16-bit port multiplexing, connectionless UDP datagram headers, checksum verification, and why voice/video streaming and DNS favor UDP over TCP.",
      difficulty: "Foundation",
      interviewBenchmark: "Contrast TCP and UDP header overhead and explain why video conferencing systems favor UDP.",
      topics: [
        {
          id: "cn-t-7-1",
          title: "Transport Multiplexing & User Datagram Protocol (UDP)",
          description: "Socket port numbers, connectionless communication, and UDP header format.",
          difficulty: "Foundation",
          learningObjectives: ["Explain port multiplexing", "Analyze UDP 8-byte header simplicity"],
          subtopics: [
            {
              id: "cn-st-7-1-1",
              title: "UDP Architecture & Minimal Overhead",
              description: "Why UDP provides only port multiplexing and optional error checksumming.",
              difficulty: "Foundation",
              keyTakeaways: [
                "UDP header is only 8 bytes (Source Port, Dest Port, Length, Checksum) compared to TCP's minimum 20 bytes.",
                "UDP has no connection state, no retransmissions, no flow control, and no congestion control, providing predictable low-latency transmission."
              ],
              concepts: ["Connectionless", "8-Byte Header", "Low Latency", "Head-of-Line Blocking Immunity"],
              questions: [
                {
                  id: "cn-q-8",
                  statement: "Why does real-time gaming or video streaming prefer UDP over TCP even if some packets are dropped?",
                  type: "Interview",
                  difficulty: "Foundation",
                  explanation: "Because TCP retransmits lost packets and stalls delivery of subsequent packets until the missing packet arrives (Head-of-Line blocking). In real-time video or gaming, a frame that arrives 200ms late is useless; dropping it and immediately displaying the next live frame is far preferable."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-8",
      order: 8,
      title: "TCP Internals: Connection Lifecycle, Flow & Congestion Control",
      shortDescription: "Handshake, teardown, sequence numbers, sliding window, and CUBIC congestion control.",
      detailedOverview: "Master the most critical protocol in systems engineering. Study Initial Sequence Number (ISN) generation, the 3-way handshake, 4-way FIN teardown, TIME_WAIT state (2MSL), sliding window flow control, and CUBIC/AIMD congestion control.",
      difficulty: "Advanced",
      interviewBenchmark: "Explain why TCP requires a 3-way handshake instead of a 2-way handshake, and walk through Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery.",
      topics: [
        {
          id: "cn-t-8-1",
          title: "TCP Connection Establishment & Teardown",
          description: "SYN/ACK sequence synchronization, TIME_WAIT state, and SYN flood attacks.",
          difficulty: "Intermediate",
          learningObjectives: ["Trace TCP 3-way handshake and 4-way FIN", "Explain 2MSL TIME_WAIT state"],
          subtopics: [
            {
              id: "cn-st-8-1-1",
              title: "The 3-Way Handshake & Delayed Duplicate Protection",
              description: "Why two packets are insufficient across an unreliable lossy network.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "TCP is full-duplex; both client and server must independently synchronize sequence numbers.",
                "A 2-way handshake fails because delayed duplicate SYN packets roaming in the network would resurrect dead connections on the server."
              ],
              concepts: ["SYN", "SYN-ACK", "ACK", "Delayed Duplicates", "SYN Cookies", "TIME_WAIT (2MSL)"],
              questions: [
                {
                  id: "cn-q-9",
                  statement: "Why does the client endpoint enter the TIME_WAIT state for 2 Maximum Segment Lifetimes (2MSL) upon closing a connection?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Two reasons: (1) To reliably deliver the final ACK to the server; if the ACK is lost, the server retransmits FIN, and the client in TIME_WAIT can resend ACK instead of sending RST. (2) To allow old duplicate packets lingering in the network to expire so they don't corrupt a future new socket using the same 4-tuple."
                }
              ]
            }
          ]
        },
        {
          id: "cn-t-8-2",
          title: "Flow Control vs Congestion Control",
          description: "Receive window (rwnd) vs congestion window (cwnd), Slow Start, and AIMD.",
          difficulty: "Advanced",
          learningObjectives: ["Contrast Flow Control with Congestion Control", "Trace CUBIC / Reno congestion window growth"],
          subtopics: [
            {
              id: "cn-st-8-2-1",
              title: "Flow Control (rwnd) & Sliding Window",
              description: "Preventing the sender from overwhelming the receiver's buffer.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Flow control is end-to-end: the receiver advertises its available buffer space in the `rwnd` header field.",
                "The sender guarantees that unacknowledged in-flight bytes never exceed `rwnd`."
              ],
              concepts: ["Sliding Window", "rwnd", "Zero-Window Probe", "Silly Window Syndrome"],
              questions: [
                {
                  id: "cn-q-10",
                  statement: "What is Silly Window Syndrome and how does Nagle's algorithm help mitigate it on the sender side?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Silly window syndrome occurs when data is exchanged in tiny fragments (e.g. 1 byte payload with 40 bytes of TCP/IP headers). Nagle's algorithm buffers small outgoing writes until all previous in-flight data is acknowledged or until a full Maximum Segment Size (MSS) packet is accumulated."
                }
              ]
            },
            {
              id: "cn-st-8-2-2",
              title: "Congestion Control: Slow Start, AIMD & CUBIC",
              description: "Preventing the sender from overwhelming intermediate network routers.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Congestion control is network-wide: the sender dynamically estimates network capacity via the congestion window (`cwnd`).",
                "Slow Start doubles cwnd every RTT until ssthresh; Congestion Avoidance increases cwnd linearly (+1 MSS per RTT - Additive Increase); packet drop cuts cwnd (Multiplicative Decrease).",
                "Linux uses CUBIC, which grows cwnd as a cubic function of time since the last congestion event."
              ],
              concepts: ["cwnd", "Slow Start", "AIMD", "CUBIC", "Fast Retransmit (3 Dup ACKs)", "Fast Recovery"],
              questions: [
                {
                  id: "cn-q-11",
                  statement: "How does TCP distinguish between mild packet loss and severe network congestion?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Receiving 3 Duplicate ACKs signals mild loss: subsequent packets arrived safely, so Fast Retransmit immediately resends the missing segment without waiting for the RTO timer, and Fast Recovery halves cwnd. A full Retransmission Timeout (RTO) signals severe congestion, resetting cwnd to 1 MSS and entering Slow Start."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-9",
      order: 9,
      title: "Modern Transport Protocols: QUIC & HTTP/3",
      shortDescription: "QUIC over UDP, zero head-of-line blocking, 0-RTT handshakes, and connection migration.",
      detailedOverview: "Examine how modern transport engineering solves TCP's fundamental constraints. Study QUIC (RFC 9000), how it implements stream multiplexing over UDP without Layer 4 head-of-line blocking, connection IDs for IP roaming, and integrated TLS 1.3.",
      difficulty: "Advanced",
      interviewBenchmark: "Explain how QUIC eliminates transport-layer Head-of-Line blocking compared to HTTP/2 over TCP.",
      topics: [
        {
          id: "cn-t-9-1",
          title: "QUIC Protocol Architecture",
          description: "UDP substrate, independent stream frames, and connection IDs.",
          difficulty: "Advanced",
          learningObjectives: ["Contrast QUIC with TCP + TLS", "Explain connection migration"],
          subtopics: [
            {
              id: "cn-st-9-1-1",
              title: "Eliminating Head-of-Line (HoL) Blocking in QUIC",
              description: "Why single-stream packet loss in HTTP/2 stalls all streams, and how QUIC isolates streams.",
              difficulty: "Advanced",
              keyTakeaways: [
                "In HTTP/2 over TCP, if one packet is dropped, TCP stalls delivery of all streams in the socket buffer until the missing packet is retransmitted.",
                "In QUIC, each stream is independent. If a packet for Stream 1 is lost, Stream 2 and Stream 3 continue processing without delay."
              ],
              concepts: ["Transport HoL Blocking", "QUIC Streams", "Connection ID", "0-RTT Handshake"],
              questions: [
                {
                  id: "cn-q-12",
                  statement: "Why did the IETF build QUIC on top of UDP instead of creating a brand-new Layer 4 transport protocol?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Protocol ossification. Middleboxes, NAT firewalls, and routers across the Internet drop packets using unknown Layer 4 protocol numbers. Building QUIC over ubiquitous UDP packets allowed immediate deployment across all existing Internet middleboxes without firmware upgrades."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-10",
      order: 10,
      title: "Application Layer & Socket Programming",
      shortDescription: "Client-server architecture, BSD socket API, and non-blocking sockets.",
      detailedOverview: "Connect operating system networking to user-space applications. Study the BSD socket API (socket, bind, listen, accept, connect, send, recv), blocking vs non-blocking sockets, and socket buffer sizes.",
      difficulty: "Intermediate",
      interviewBenchmark: "Write out the sequence of socket API calls executed by a multi-threaded TCP server from initialization to client connection handling.",
      topics: [
        {
          id: "cn-t-10-1",
          title: "BSD Socket API & Life Cycle",
          description: "Server listen queue (SYN backlog vs accept backlog) and client connect.",
          difficulty: "Intermediate",
          learningObjectives: ["Trace socket system call flow", "Differentiate SYN backlog from listen backlog"],
          subtopics: [
            {
              id: "cn-st-10-1-1",
              title: "Server Socket Flow: socket(), bind(), listen(), accept()",
              description: "How the OS kernel manages incoming connections across backlog queues.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A server creates a socket, binds it to an IP:Port, sets it to listen state, and calls `accept()` to return a NEW connected client socket descriptor.",
                "The kernel maintains two queues: the incomplete connection queue (SYN received) and the completed connection queue (ESTABLISHED, waiting for accept())."
              ],
              concepts: ["Listening Socket", "Connected Socket", "SYN Backlog", "Accept Backlog"],
              questions: [
                {
                  id: "cn-q-13",
                  statement: "Why does `accept()` return a new file descriptor instead of reusing the listening socket descriptor?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Because the listening socket must remain bound to the well-known port to continue receiving incoming connection handshakes from new clients. The new connected socket represents the specific established 4-tuple connection with that single client."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-11",
      order: 11,
      title: "DNS & Web Protocols (HTTP/1.1, HTTP/2, HTTP/3)",
      shortDescription: "Hierarchical DNS resolution, HTTP/1.1 keep-alive, HTTP/2 binary framing, and WebSockets.",
      detailedOverview: "Master web architecture protocols. Follow hierarchical DNS resolution across Root, TLD, and Authoritative servers. Trace the evolution of HTTP from HTTP/1.1 text pipelining to HTTP/2 binary stream multiplexing and HTTP/3.",
      difficulty: "Intermediate",
      interviewBenchmark: "Trace step-by-step what happens when entering a URL into a browser address bar, from DNS resolution to DOM rendering.",
      topics: [
        {
          id: "cn-t-11-1",
          title: "Domain Name System (DNS) Resolution Hierarchy",
          description: "Root servers, TLD servers, Authoritative nameservers, and recursive vs iterative queries.",
          difficulty: "Foundation",
          learningObjectives: ["Trace recursive vs iterative DNS queries", "Understand DNS record types (A, AAAA, CNAME, MX)"],
          subtopics: [
            {
              id: "cn-st-11-1-1",
              title: "Recursive vs Iterative DNS Lookup Flow",
              description: "How domain names are translated into 32-bit IPv4 or 128-bit IPv6 addresses.",
              difficulty: "Foundation",
              keyTakeaways: [
                "Client queries local recursive resolver (e.g. 1.1.1.1). The recursive resolver makes iterative queries: Root nameserver -> TLD nameserver (.org) -> Authoritative nameserver (kernelcs.org).",
                "Results are cached at every layer according to TTL (Time to Live) values."
              ],
              concepts: ["Recursive Resolver", "Root Nameserver", "TLD Nameserver", "Authoritative Nameserver", "TTL", "CNAME vs A Record"],
              questions: [
                {
                  id: "cn-q-14",
                  statement: "What is the difference between an A record and a CNAME record in DNS?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "An A record maps a domain name directly to an IPv4 address (e.g. `api.kernelcs.org -> 198.51.100.42`). A CNAME (Canonical Name) record creates an alias mapping one domain name to another domain name (e.g. `docs.kernelcs.org -> kernelcs.github.io`), requiring an additional DNS lookup to resolve the final IP."
                }
              ]
            }
          ]
        },
        {
          id: "cn-t-11-2",
          title: "Evolution of HTTP Protocols",
          description: "HTTP/1.1 pipelining vs HTTP/2 binary framing vs WebSockets.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast HTTP/1.1 with HTTP/2", "Explain WebSockets full-duplex framing"],
          subtopics: [
            {
              id: "cn-st-11-2-1",
              title: "HTTP/2 Binary Framing & Multiplexing",
              description: "How HTTP/2 streams eliminate HTTP/1.1 head-of-line blocking over a single TCP connection.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "HTTP/1.1 is text-based and processes requests sequentially on a connection, suffering from Head-of-Line blocking.",
                "HTTP/2 splits requests into binary frames tagged with a Stream ID, multiplexing hundreds of bidirectional streams concurrently over a single TCP connection."
              ],
              concepts: ["Binary Framing", "Stream ID", "HPACK Compression", "Server Push"],
              questions: [
                {
                  id: "cn-q-15",
                  statement: "How does HTTP/2 multiplexing eliminate the need for HTTP/1.1 optimization hacks like domain sharding and CSS image sprite sheets?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "In HTTP/1.1, browsers opened 6 separate TCP connections per domain and used sprite sheets to avoid connection limits and head-of-line blocking. HTTP/2 can interleave hundreds of requests simultaneously over a single TCP connection with zero head-of-line blocking at Layer 7, rendering domain sharding obsolete."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-12",
      order: 12,
      title: "Network Security & Cryptography (TLS 1.3)",
      shortDescription: "Symmetric vs asymmetric encryption, Diffie-Hellman, digital certificates, and TLS 1.3.",
      detailedOverview: "Understand how cryptographic protocols secure data in transit. Study symmetric (AES-GCM) vs asymmetric cryptography (RSA, ECC), Diffie-Hellman key exchange, X.509 PKI certificates, and the modern 1-RTT TLS 1.3 handshake.",
      difficulty: "Advanced",
      interviewBenchmark: "Explain how TLS 1.3 achieves forward secrecy and reduces handshake latency from 2 RTTs to 1 RTT compared to TLS 1.2.",
      topics: [
        {
          id: "cn-t-12-1",
          title: "Cryptographic Keys & TLS 1.3 Handshake",
          description: "Diffie-Hellman Ephemeral (ECDHE), digital certificates, and session resumption.",
          difficulty: "Advanced",
          learningObjectives: ["Trace TLS 1.3 1-RTT key exchange", "Explain Forward Secrecy"],
          subtopics: [
            {
              id: "cn-st-12-1-1",
              title: "TLS 1.3 vs TLS 1.2 Handshake & Forward Secrecy",
              description: "Why TLS 1.3 deprecated static RSA key exchange in favor of ephemeral Diffie-Hellman.",
              difficulty: "Advanced",
              keyTakeaways: [
                "TLS 1.3 combines cipher suite selection with ephemeral key sharing in the initial ClientHello, cutting connection latency from 2 RTTs to 1 RTT.",
                "Forward secrecy guarantees that even if an attacker steals the server's private key in the future, past recorded encrypted traffic cannot be decrypted."
              ],
              concepts: ["ECDHE", "Forward Secrecy", "1-RTT Handshake", "X.509 Certificates", "0-RTT Resumption"],
              questions: [
                {
                  id: "cn-q-16",
                  statement: "Why did TLS 1.3 completely remove support for RSA key exchange?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "In RSA key exchange, the client encrypts the premaster secret using the server's public key. If the server's private key is compromised years later, an adversary who recorded past traffic can decrypt all historic sessions. Ephemeral Diffie-Hellman generates disposable per-session keys, guaranteeing Perfect Forward Secrecy."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cn-mod-13",
      order: 13,
      title: "Wireless, CDNs & Modern Edge Architecture",
      shortDescription: "Wi-Fi CSMA/CA, Content Delivery Networks (CDNs), Anycast routing, and reverse proxies.",
      detailedOverview: "Examine edge distribution networks. Learn how Content Delivery Networks (CDNs) cache static assets near users, how Anycast BGP routes traffic to the nearest data center, and contrast forward and reverse proxies.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain how BGP Anycast allows thousands of edge CDN servers to share the exact same IP address worldwide.",
      topics: [
        {
          id: "cn-t-13-1",
          title: "CDNs, Anycast & Edge Routing",
          description: "BGP Anycast routing, edge caching, and reverse proxies.",
          difficulty: "Intermediate",
          learningObjectives: ["Explain Anycast routing mechanics", "Evaluate CDN cache invalidation strategies"],
          subtopics: [
            {
              id: "cn-st-13-1-1",
              title: "BGP Anycast Routing Architecture",
              description: "Advertising the identical IP address from multiple global data centers simultaneously.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "In Anycast, multiple edge servers worldwide announce the exact same IP address block via BGP.",
                "Routers forward packets to the topologically closest server according to standard BGP path selection, reducing latency and mitigating DDoS attacks."
              ],
              concepts: ["Anycast", "Unicast", "Edge Caching", "DDoS Absorption", "Reverse Proxy"],
              questions: [
                {
                  id: "cn-q-17",
                  statement: "How does Anycast routing protect web platforms from distributed denial-of-service (DDoS) attacks?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Because the same IP is announced from hundreds of edge locations, attack traffic originating from botnets around the world is partitioned and localized to the nearest geographical data centers, preventing aggregate attack volume from concentrating onto a single central origin server."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

