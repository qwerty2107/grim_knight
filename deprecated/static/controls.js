request_button = document.getElementById("request_button").addEventListener("click", send_request);

const host_data =
{
    port: 8000,
    host: '127.0.0.1',
};

const server_path = "127.0.0.1:8000";

const evtSource = new EventSource(server_path, 
    {
        withCredentials: true,
    });


function send_request()
{
    const req = http.request()
}


