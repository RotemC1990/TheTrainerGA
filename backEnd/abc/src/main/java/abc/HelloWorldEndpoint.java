package abc;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/hello")
public class HelloWorldEndpoint {

  public HelloWorldEndpoint() {
      System.out.println("class loaded " + this.getClass());
  }
  //open the socket conection
  @OnOpen
  public void onOpen(Session session) {
      System.out.printf("Session opened, id: %s%n", session.getId());
      try {
          session.getBasicRemote().sendText("Hi there, we are successfully connected.");
      } catch (IOException ex) {
          ex.printStackTrace();
      }
  }
  //the massage we received from the socket
  @OnMessage
  public void onMessage(String message, Session session) {
      System.out.printf("Message received. Session id: %s Message: %s%n",
              session.getId(), message);
      TimeTableGA.main(message);
      try {
          session.getBasicRemote().sendText(String.format("We received your message: %s%n", message));
      } catch (IOException ex) {
          ex.printStackTrace();
      }
  }
  //if we have an error
  @OnError
  public void onError(Throwable e) {
      e.printStackTrace();
  }
  //close the socket connection
  @OnClose
  public void onClose(Session session) {
      System.out.printf("Session closed with id: %s%n", session.getId());
  }
}