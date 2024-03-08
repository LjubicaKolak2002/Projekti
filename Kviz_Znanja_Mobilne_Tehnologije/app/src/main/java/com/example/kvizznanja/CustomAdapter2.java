package com.example.kvizznanja;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.List;

public class CustomAdapter2 extends RecyclerView.Adapter<CustomAdapter2.CustomViewHolder> {

    private List<Result> resultList;
    private Context context;

    public CustomAdapter2(Context context, List<Result> resultList) {
        this.context = context;
        this.resultList = resultList;
    }

    class CustomViewHolder extends RecyclerView.ViewHolder {

        public final View mView;
        TextView user, result, index, seconds;

        CustomViewHolder(View itemView) {
            super(itemView);
            mView = itemView;
            index = mView.findViewById(R.id.textViewRank);
            user = mView.findViewById(R.id.textViewUser);
            result = mView.findViewById(R.id.textViewResult);
            seconds = mView.findViewById(R.id.textViewTotalTime);
        }
    }

    @Override
    public CustomViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.top_results_view_holder, parent, false);
        return new CustomViewHolder(view);
    }

    public void setDataList(List<Result> newResultList) {
        this.resultList = newResultList;
        notifyDataSetChanged();
    }

    @Override
    public void onBindViewHolder(CustomViewHolder holder, int position) {
        Result currentResult = resultList.get(position);
        holder.index.setText(String.valueOf(position + 1) + ".");
        String userId = currentResult.getUser_id();
        holder.seconds.setText(String.valueOf(currentResult.getSekunde()) + "s");
        holder.result.setText(String.valueOf(currentResult.getPostotak()) + "%");

        getUserEmail(userId, holder);
    }

    private void getUserEmail(String userId, CustomViewHolder holder) {
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("korisnici");

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for (DataSnapshot childSnapshot : snapshot.getChildren()) {
                    User user = childSnapshot.getValue(User.class);
                    if (user != null && userId.equals(user.getUser_id())) {
                        holder.user.setText(user.getUsername());
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(context, "Error while getting users", Toast.LENGTH_SHORT).show();
            }
        });
    }


    @Override
    public int getItemCount() {
        return resultList.size();
    }
}
