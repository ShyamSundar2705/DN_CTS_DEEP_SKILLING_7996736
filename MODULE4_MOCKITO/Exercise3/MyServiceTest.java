import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class MyServiceTest {

    @Test
    public void testArgumentMatching() {

        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        when(mockApi.getData(anyString())).thenReturn("Mock Data");

        MyService service = new MyService(mockApi);

        String result = service.fetchData("Shyam");

        assertEquals("Mock Data", result);

        verify(mockApi).getData(eq("Shyam"));
    }
}